import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FaEdit } from "react-icons/fa";

function Feedback() {
    const [newFeedback, setNewFeedback] = useState('');
    const [replyTexts, setReplyTexts] = useState({});
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [editingReply, setEditingReply] = useState(null);
  
    const handleSendFeedback = ({
        feedbackList,
        currentUserRole,
        onSendFeedback,
        onReplyFeedback,
        onModifyFeedback,
        onModifyReply,
        supervisorName,
        studentName,
      }) => {
      if (newFeedback.trim()) {
        onSendFeedback(newFeedback);
        setNewFeedback('');
      }
    };
  
    const handleReplyFeedback = (index) => {
      if (replyTexts[`feedback-${index}`]?.trim()) {
        onReplyFeedback(index, replyTexts[`feedback-${index}`]);
        setReplyTexts(prev => ({ ...prev, [`feedback-${index}`]: '' }));
      }
    };
  
    const handleModifyFeedback = () => {
      if (editingFeedback && editingFeedback.text.trim()) {
        onModifyFeedback(editingFeedback.index, editingFeedback.text);
        setEditingFeedback(null);
      }
    };
  
    const handleModifyReply = () => {
      if (editingReply && editingReply.text.trim()) {
        onModifyReply(editingReply.feedbackIndex, editingReply.replyIndex, editingReply.text);
        setEditingReply(null);
      }
    };
  
    return (
      <div className="space-y-6">
        {currentUserRole === 'supervisor' && (
          <Card className="p-4">
            <Textarea
              placeholder="Provide feedback here..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              className="mb-2"
            />
            <Button
              onClick={handleSendFeedback}
              disabled={newFeedback.trim() === ''}
            >
              Send Feedback
            </Button>
          </Card>
        )}
  
        {feedbackList.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="font-semibold mb-2">{`${supervisorName}:`}</div>
            {editingFeedback && editingFeedback.index === index ? (
              <>
                <Textarea
                  value={editingFeedback.text}
                  onChange={(e) => setEditingFeedback({ ...editingFeedback, text: e.target.value })}
                  className="mb-2"
                />
                <Button onClick={handleModifyFeedback}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <p className="mb-2">{item.text}</p>
                {currentUserRole === 'supervisor' && (
                  <Button
                    variant="outline"
                    onClick={() => setEditingFeedback({ index, text: item.text })}
                    className="mb-2"
                  >
                    <FaEdit className="mr-2" /> Modify
                  </Button>
                )}
              </>
            )}
  
            {currentUserRole === 'student' && (
              <div className="mt-4">
                <Textarea
                  placeholder="Reply to this feedback..."
                  value={replyTexts[`feedback-${index}`] || ''}
                  onChange={(e) => setReplyTexts(prev => ({ ...prev, [`feedback-${index}`]: e.target.value }))}
                  className="mb-2"
                />
                <Button
                  onClick={() => handleReplyFeedback(index)}
                  disabled={!replyTexts[`feedback-${index}`]?.trim()}
                >
                  Reply
                </Button>
              </div>
            )}
  
            {item.replies && item.replies.map((reply, replyIndex) => (
              <Card key={replyIndex} className="mt-2 p-2">
                <div className="font-semibold mb-1">{`${studentName}:`}</div>
                {editingReply && editingReply.feedbackIndex === index && editingReply.replyIndex === replyIndex ? (
                  <>
                    <Textarea
                      value={editingReply.text}
                      onChange={(e) => setEditingReply({ ...editingReply, text: e.target.value })}
                      className="mb-2"
                    />
                    <Button onClick={handleModifyReply}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="mb-2">{reply.text}</p>
                    {currentUserRole === 'student' && (
                      <Button
                        variant="outline"
                        onClick={() => setEditingReply({ feedbackIndex: index, replyIndex, text: reply.text })}
                        size="sm"
                      >
                        <FaEdit className="mr-2" /> Modify
                      </Button>
                    )}
                  </>
                )}
              </Card>
            ))}
          </Card>
        ))}
      </div>
    );
}

export default Feedback