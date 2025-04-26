// app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

type RouteParams = {
  params: {
    commentId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.commentId;
    
    // Verificar usuário atual
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Você precisa estar logado para excluir comentários' },
        { status: 401 }
      );
    }
    
    // Verificar se o comentário existe
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!comment) {
      return NextResponse.json(
        { message: 'Comentário não encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar se o usuário é o autor do comentário ou um administrador
    if (comment.userId !== user.id && !user.is_admin) {
      return NextResponse.json(
        { message: 'Você não tem permissão para excluir este comentário' },
        { status: 403 }
      );
    }
    
    // Excluir respostas primeiro (se houver)
    await prisma.comment.deleteMany({
      where: { parentId: parseInt(id) }
    });
    
    // Excluir o comentário
    await prisma.comment.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'Comentário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir comentário' },
      { status: 500 }
    );
  }
}