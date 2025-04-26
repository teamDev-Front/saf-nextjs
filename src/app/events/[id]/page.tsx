// app/events/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

type Event = {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  image_path?: string;
  details?: string;
};

type Comment = {
  id: number;
  user_id: number;
  user_name: string;
  event_id: number;
  comment: string;
  is_question: boolean;
  created_at: string;
  parent_id?: number;
  replies?: Comment[];
};

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const eventId = params.id;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isQuestion, setIsQuestion] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  useEffect(() => {
    const fetchEventAndComments = async () => {
      try {
        const [eventRes, commentsRes] = await Promise.all([
          axios.get(`/api/events/${eventId}`),
          axios.get(`/api/events/${eventId}/comments`)
        ]);
        
        setEvent(eventRes.data);
        setComments(commentsRes.data);
      } catch (error) {
        console.error('Erro ao carregar evento:', error);
        showAlert('Fehler beim Laden der Veranstaltungsdetails.', 'danger');
      } finally {
        setLoading(false);
      }
    };
    
    if (eventId) {
      fetchEventAndComments();
    }
  }, [eventId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const showAlert = (message: string, type: 'success' | 'danger') => {
    setAlert({ message, type });
    
    // Esconder alerta após 5 segundos
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    try {
      const response = await axios.post(`/api/events/${eventId}/comments`, {
        comment: commentText,
        is_question: isQuestion
      });
      
      // Atualizar lista de comentários
      const updatedComments = await axios.get(`/api/events/${eventId}/comments`);
      setComments(updatedComments.data);
      
      // Limpar formulário
      setCommentText('');
      setIsQuestion(false);
      
      showAlert('Kommentar erfolgreich hinzugefügt!', 'success');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      showAlert('Fehler beim Hinzufügen des Kommentars. Bitte versuchen Sie es später erneut.', 'danger');
    }
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyText('');
  };

  const handleSubmitReply = async (commentId: number) => {
    if (!replyText.trim()) return;
    
    try {
      await axios.post(`/api/events/${eventId}/comments`, {
        comment: replyText,
        parent_id: commentId
      });
      
      // Atualizar lista de comentários
      const updatedComments = await axios.get(`/api/events/${eventId}/comments`);
      setComments(updatedComments.data);
      
      // Fechar formulário de resposta
      setReplyingTo(null);
      setReplyText('');
      
      showAlert('Antwort erfolgreich hinzugefügt!', 'success');
    } catch (error) {
      console.error('Erro ao adicionar resposta:', error);
      showAlert('Fehler beim Hinzufügen der Antwort. Bitte versuchen Sie es später erneut.', 'danger');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('Sind Sie sicher, dass Sie diesen Kommentar löschen möchten?')) {
      return;
    }
    
    try {
      await axios.delete(`/api/comments/${commentId}`);
      
      // Atualizar lista de comentários
      const updatedComments = await axios.get(`/api/events/${eventId}/comments`);
      setComments(updatedComments.data);
      
      showAlert('Kommentar erfolgreich gelöscht!', 'success');
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      showAlert('Fehler beim Löschen des Kommentars. Bitte versuchen Sie es später erneut.', 'danger');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-0"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-semibold mb-4">Event nicht gefunden</h2>
        <p className="mb-8">Die angeforderte Veranstaltung existiert nicht oder wurde entfernt.</p>
        <Link href="/events" className="btn btn-primary">
          Zurück zur Eventübersicht
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-container pt-32 px-6 md:px-20 lg:px-40 pb-16">
      {alert && (
        <div className={`mb-6 p-4 rounded ${alert.type === 'success' ? 'bg-green-800/20 text-green-400 border border-green-800/30' : 'bg-red-800/20 text-red-400 border border-red-800/30'}`}>
          {alert.message}
        </div>
      )}

      <div className="event-detail-header flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{event.title}</h1>
        <div className="event-date-badge bg-main-0 text-white px-4 py-3 rounded-lg font-semibold text-lg">
          {formatDate(event.date)}
        </div>
      </div>

      <div className="w-full h-[500px] relative mb-8 overflow-hidden rounded-lg">
        <Image 
          src={event.image_path || "/assets/images/event-placeholder.jpg"} 
          alt={event.title} 
          fill
          className="object-cover"
        />
      </div>

      <div className="event-info-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="event-description lg:col-span-2">
          <div className="prose prose-lg text-gray-300 max-w-none">
            {event.description?.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          {event.details && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
              <div className="prose text-gray-300 max-w-none">
                {event.details.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="event-details bg-grey--1 p-6 rounded-lg">
          <div className="event-detail-item mb-4">
            <div className="detail-label font-semibold text-white mb-1">Datum</div>
            <div className="detail-value text-gray-400">{formatDate(event.date)}</div>
          </div>
          <div className="event-detail-item mb-4">
            <div className="detail-label font-semibold text-white mb-1">Zeit</div>
            <div className="detail-value text-gray-400">{event.time || 'Nicht angegeben'}</div>
          </div>
          <div className="event-detail-item mb-4">
            <div className="detail-label font-semibold text-white mb-1">Ort</div>
            <div className="detail-value text-gray-400">{event.location}</div>
          </div>
          <a href="#" className="register-btn block w-full py-3.5 px-4 bg-main-0 text-white border-none rounded font-semibold text-base text-center mt-6 transition-colors hover:bg-main--1">
            Mehr Informationen
          </a>
        </div>
      </div>

      <div className="comments-section mt-16 pt-8 border-t border-grey--1">
        <div className="comments-header flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Kommentare & Fragen</h2>
          <div className="comment-count text-gray-400">
            {comments.length} {comments.length === 1 ? 'Kommentar' : 'Kommentare'}
          </div>
        </div>

        {user ? (
          <form onSubmit={handleSubmitComment} className="comment-form mb-8">
            <textarea 
              className="w-full p-4 border border-grey--1 bg-black rounded text-white text-base mb-4 min-h-[100px] resize-y focus:outline-none focus:border-main-0"
              placeholder="Schreiben Sie Ihren Kommentar oder Ihre Frage hier..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="comment-actions flex justify-between items-center flex-col gap-4 sm:flex-row">
              <label className="question-checkbox flex items-center gap-2 text-gray-400">
                <input 
                  type="checkbox" 
                  checked={isQuestion}
                  onChange={(e) => setIsQuestion(e.target.checked)}
                  className="rounded bg-transparent border-gray-400"
                /> 
                Dies ist eine Frage
              </label>
              <button 
                type="submit" 
                className="submit-comment py-2.5 px-5 bg-main-0 text-white border-none rounded font-semibold text-base cursor-pointer w-full sm:w-auto hover:bg-main--1"
              >
                Kommentar abschicken
              </button>
            </div>
          </form>
        ) : (
          <div className="login-prompt text-center py-6 px-4 bg-grey--1 rounded-lg mb-8">
            <p className="mb-2">Sie müssen angemeldet sein, um Kommentare zu hinterlassen.</p>
            <p>
              <Link href="/login" className="text-main-1 font-semibold">Anmelden</Link> oder {' '}
              <Link href="/register" className="text-main-1 font-semibold">Registrieren</Link>
            </p>
          </div>
        )}

        <div className="comment-list space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div 
                key={comment.id} 
                className={`comment-card bg-grey--1 p-5 rounded-lg ${comment.is_question ? 'border-l-4 border-main-0' : ''}`}
              >
                <div className="comment-header flex justify-between mb-3">
                  <div className="comment-author font-semibold text-white">{comment.user_name}</div>
                  <div className="comment-date text-gray-400 text-sm">{formatDateTime(comment.created_at)}</div>
                </div>
                <div className="comment-content text-gray-300 mb-4">{comment.comment}</div>
                <div className="comment-actions-bar flex justify-end gap-4">
                  {user && (
                    <button 
                      className="comment-action text-gray-400 text-sm bg-transparent border-none cursor-pointer hover:text-white"
                      onClick={() => handleReply(comment.id)}
                    >
                      Antworten
                    </button>
                  )}
                  {user && (user.id === comment.user_id || user.is_admin) && (
                    <button 
                      className="comment-action text-gray-400 text-sm bg-transparent border-none cursor-pointer hover:text-white"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Löschen
                    </button>
                  )}
                </div>
                
                {replyingTo === comment.id && user && (
                  <div className="reply-form mt-4">
                    <textarea 
                      className="w-full p-3 border border-grey--1 bg-black rounded text-white text-base mb-3 min-h-[80px] resize-y focus:outline-none focus:border-main-0"
                      placeholder="Schreiben Sie Ihre Antwort hier..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        className="py-2 px-4 bg-main-0 text-white border-none rounded font-semibold text-base cursor-pointer hover:bg-main--1"
                        onClick={() => handleSubmitReply(comment.id)}
                      >
                        Antwort abschicken
                      </button>
                    </div>
                  </div>
                )}
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="comment-replies mt-4 pl-6 border-l border-grey--1">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="comment-card bg-grey--1 p-4 rounded-lg mt-3">
                        <div className="comment-header flex justify-between mb-2">
                          <div className="comment-author font-semibold text-white">{reply.user_name}</div>
                          <div className="comment-date text-gray-400 text-sm">{formatDateTime(reply.created_at)}</div>
                        </div>
                        <div className="comment-content text-gray-300 mb-2">{reply.comment}</div>
                        {user && (user.id === reply.user_id || user.is_admin) && (
                          <div className="comment-actions-bar flex justify-end">
                            <button 
                              className="comment-action text-gray-400 text-sm bg-transparent border-none cursor-pointer hover:text-white"
                              onClick={() => handleDeleteComment(reply.id)}
                            >
                              Löschen
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-8">Keine Kommentare vorhanden.</p>
          )}
        </div>
      </div>
    </div>
  );
}