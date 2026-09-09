export default function Notification({ notification }) {
    if (!notification) return null;

    const { message, type } = notification;

    return <div className={`notification-box ${type}`}>{message}</div>;
}
