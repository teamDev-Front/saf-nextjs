// app/api/events/[id]/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

type RouteParams = {
    params: {
        eventId: string;
    };
};

interface CommentWithUser {
    id: number;
    eventId: number;
    userId: number;
    comment: string;
    is_question: boolean;
    createdAt: Date;
    parentId: number | null;
    user: {
        id: number;
        name: string;
    };
    replies: CommentWithUser[];
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const eventId = params.eventId;

        const comments = await prisma.comment.findMany({
            where: {
                eventId: parseInt(eventId),
                parentId: null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                replies: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Formatar os comentários para o formato esperado pelo frontend
        const formattedComments = comments.map((comment: CommentWithUser) => ({
            id: comment.id,
            event_id: comment.eventId,
            user_id: comment.userId,
            user_name: comment.user.name,
            comment: comment.comment,
            is_question: comment.is_question,
            created_at: comment.createdAt,
            replies: comment.replies.map((reply: CommentWithUser) => ({
                id: reply.id,
                event_id: reply.eventId,
                user_id: reply.userId,
                user_name: reply.user.name,
                comment: reply.comment,
                is_question: reply.is_question,
                created_at: reply.createdAt,
                parent_id: reply.parentId
            }))
        }));

        return NextResponse.json(formattedComments);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        return NextResponse.json(
            { message: 'Erro ao buscar comentários' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest, { params }: RouteParams) {
    try {
        const eventId = params.eventId;
        const { comment, is_question, parent_id } = await req.json();

        // Verificar usuário atual
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: 'Você precisa estar logado para comentar' },
                { status: 401 }
            );
        }

        // Validação básica
        if (!comment) {
            return NextResponse.json(
                { message: 'O comentário não pode estar vazio' },
                { status: 400 }
            );
        }

        // Verificar se o evento existe
        const event = await prisma.event.findUnique({
            where: { id: parseInt(eventId) }
        });

        if (!event) {
            return NextResponse.json(
                { message: 'Evento não encontrado' },
                { status: 404 }
            );
        }

        // Se for uma resposta, verificar se o comentário pai existe
        if (parent_id) {
            const parentComment = await prisma.comment.findUnique({
                where: { id: parseInt(parent_id) }
            });

            if (!parentComment) {
                return NextResponse.json(
                    { message: 'Comentário original não encontrado' },
                    { status: 404 }
                );
            }
        }

        // Inserir comentário
        const newComment = await prisma.comment.create({
            data: {
                comment,
                is_question: is_question || false,
                eventId: parseInt(eventId),
                userId: user.id,
                parentId: parent_id ? parseInt(parent_id) : null
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        // Formatar a resposta
        const formattedComment = {
            id: newComment.id,
            event_id: newComment.eventId,
            user_id: newComment.userId,
            user_name: newComment.user.name,
            comment: newComment.comment,
            is_question: newComment.is_question,
            created_at: newComment.createdAt,
            parent_id: newComment.parentId
        };

        return NextResponse.json({
            message: 'Comentário adicionado com sucesso',
            comment: formattedComment
        }, { status: 201 });
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        return NextResponse.json(
            { message: 'Erro ao adicionar comentário' },
            { status: 500 }
        );
    }
}