import { Switch } from "antd";
import { MouseEvent, useState } from "react";

function Notifications() {
    const [isNewLessonSwitch, setIsNewLessonSwitch] = useState(true);
    const [isNewLessonNotificationSwitch, setIsNewLessonNotificationSwitch] = useState(true);
    const [isCommentReminderSwitch, setIsCommentReminderSwitch] = useState(true);
    const [isCommentReplyReminderSwitch, setIsCommentReplyReminderSwitch] = useState(true);
    const [isCommentEditReminderSwitch, setIsCommentEditReminderSwitch] = useState(true);
    const [isBlogRuleReminderSwitch, setIsBlogRuleReminderSwitch] = useState(true);
    const [isBlogEditReminderSwitch, setIsBlogEditReminderSwitch] = useState(true);
    const [isDiscussionSwitch, setIsDiscussionSwitch] = useState(true);

    const handleNewLesson = () => {
        if (isNewLessonSwitch) setIsNewLessonSwitch(false);
        if (!isNewLessonSwitch) setIsNewLessonSwitch(true);
    };
    const handleCommentReminder = () => {
        if (isNewLessonNotificationSwitch) setIsNewLessonNotificationSwitch(false);
        if (!isNewLessonNotificationSwitch) setIsNewLessonNotificationSwitch(true);
    };
    const handleNewLessonNotification = () => {
        if (isCommentReminderSwitch) setIsCommentReminderSwitch(false);
        if (!isCommentReminderSwitch) setIsCommentReminderSwitch(true);
    };
    const handleCommentReplyReminder = () => {
        if (isCommentReplyReminderSwitch) setIsCommentReplyReminderSwitch(false);
        if (!isCommentReplyReminderSwitch) setIsCommentReplyReminderSwitch(true);
    };
    const handleCommentEditReminder= () => {
        if (isCommentEditReminderSwitch) setIsCommentEditReminderSwitch(false);
        if (!isCommentEditReminderSwitch) setIsCommentEditReminderSwitch(true);
    };
    const handleBlogRuleReminder = () => {
        if (isBlogRuleReminderSwitch) setIsBlogRuleReminderSwitch(false);
        if (!isBlogRuleReminderSwitch) setIsBlogRuleReminderSwitch(true);
    };
    const handleBlogEditReminder = () => {
        if (isBlogEditReminderSwitch) setIsBlogEditReminderSwitch(false);
        if (!isBlogEditReminderSwitch) setIsBlogEditReminderSwitch(true);
    };
    const handleDiscussion = () => {
        if (isDiscussionSwitch) setIsDiscussionSwitch(false);
        if (!isDiscussionSwitch) setIsDiscussionSwitch(true);
    };
    const box = `flex justify-between items-center py-[12px] px-[20px] rounded-lg hover:bg-[#e8ebed] dark:hover:bg-[#e8ebed23] cursor-pointer transition`;
    return (
        <div className="space-y-12">
            <div>
                <h2 className="heading_2">Email</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-2">
                    <p>Gửi email cho tôi khi có:</p>
                    <div onClick={handleNewLesson} className={`${box}`}>
                        <p className="para">Bài học mới</p>
                        <Switch checked={isNewLessonSwitch} />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="heading_2">Thông báo</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-2">
                    <p>Gửi thông báo cho tôi khi có:</p>
                    <div onClick={handleCommentReminder} className={`${box}`}>
                        <p className="para">Bài học mới</p>
                        <Switch checked={isNewLessonNotificationSwitch} />
                    </div>
                    <div onClick={handleNewLessonNotification} className={`${box}`}>
                        <p className="para">Nhắc đến trong bình luận</p>
                        <Switch checked={isCommentReminderSwitch} />
                    </div>
                    <div onClick={handleCommentReplyReminder} className={`${box}`}>
                        <p className="para">Trả lời bình luận</p>
                        <Switch checked={isCommentReplyReminderSwitch} />
                    </div>
                    <div onClick={handleCommentEditReminder} className={`${box}`}>
                        <p className="para">Cảm xúc trong bình luận</p>
                        <Switch checked={isCommentEditReminderSwitch} />
                    </div>
                    <div onClick={handleBlogRuleReminder} className={`${box}`}>
                        <p className="para">Bình luận trong bài blog</p>
                        <Switch checked={isBlogRuleReminderSwitch} />
                    </div>
                    <div onClick={handleBlogEditReminder} className={`${box}`}>
                        <p className="para">Cảm xúc trong bài blog</p>
                        <Switch checked={isBlogEditReminderSwitch} />
                    </div>
                    <div onClick={handleDiscussion} className={`${box}`}>
                        <p className="para">Câu trả lời được chọn trong màn thảo luận</p>
                        <Switch checked={isDiscussionSwitch} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Notifications;
