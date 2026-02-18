import React from 'react';
import { useNavigate } from 'react-router-dom';

const Conversations = () => {
    const navigate = useNavigate();

        const chats = [
        { id: 1, name: "La Marquise", msg: "Your burger is ready for pickup!", time: "2M AGO", unread: 1, online: true, icon: "🍔" },
        { id: 2, name: "Boulangerie Saker", msg: "We are still baking Ma.", time: "15M AGO", unread: 0, online: false, icon: "🍞" },
        { id: 3, name: "Bubbles", msg: "Thank you for your order!", time: "YESTERDAY", unread: 1, online: true, icon: "🥤" },
        { id: 4, name: "Pizza Hub", msg: "Your delivery driver is nearby!", time: "2 DAYS AGO", unread: 0, online: false, icon: "🍕" },
        { id: 5, name: "Noodle House", msg: "Would you like extra eggs with that?", time: "MAR 12", unread: 0, online: false, icon: "🍜" },
    ];

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Messages</h1>
                    <div style={{cursor: 'pointer', fontSize: '20px'}} onClick={() => navigate('/new')}>📝</div>
                </div>

                <div style={styles.searchContainer}>
                    <span style={styles.searchIcon}>🔍</span>
                    <input style={styles.searchInput} placeholder="Search vendors or orders" />
                </div>

                <div style={styles.chipRow}>
                    <button style={{...styles.chip, ...styles.chipActive}}>All Chats</button>
                    <button style={styles.chip}>Unread</button>
                    <button style={styles.chip}>Support</button>
                </div>

                <div style={styles.list}>
                    {chats.map(chat => (
                        <div key={chat.id} style={styles.chatItem} onClick={() => navigate(`/chat/${chat.id}`)}>
                            <div style={styles.avatarContainer}>
                                <div style={styles.avatar}>{chat.icon}</div>
                                {chat.online && <div style={styles.onlineStatus}></div>}
                            </div>
                            <div style={styles.chatInfo}>
                                <div style={styles.chatHeader}>
                                    <span style={styles.vendorName}>{chat.name}</span>
                                    <span style={styles.timeText}>{chat.time}</span>
                                </div>
                                <div style={styles.msgRow}>
                                    <span style={styles.msgPreview}>{chat.msg}</span>
                                    {chat.unread > 0 && <div style={styles.badge}>{chat.unread}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button style={styles.fab} onClick={() => navigate('/call/1')}>📞</button>

                <div style={styles.bottomNav}>
                    <div style={styles.navItem}>🏠<br/><span style={styles.navText}>HOME</span></div>
                    <div style={styles.navItem}>📋<br/><span style={styles.navText}>ORDERS</span></div>
                    <div style={{...styles.navItem, color: '#11A5D1'}}>💬<br/><span style={styles.navText}>MESSAGES</span></div>
                    <div style={styles.navItem}>👤<br/><span style={styles.navText}>PROFILE</span></div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    // This wrapper centers the app on desktop and makes it full screen on mobile
    pageWrapper: {
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
    },
    container: { 
        width: '100%',
        maxWidth: '500px', // Mobile phone width
        height: '100vh', 
        backgroundColor: '#fff', 
        fontFamily: 'sans-serif', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    },
    header: { padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: '24px', fontWeight: 'bold', margin: 0 },
    searchContainer: { margin: '0 20px', backgroundColor: '#F3F4F6', borderRadius: '10px', display: 'flex', alignItems: 'center', padding: '10px' },
    searchIcon: { marginRight: '10px', color: '#999' },
    searchInput: { border: 'none', background: 'none', outline: 'none', flex: 1, fontSize: '14px' },
    chipRow: { display: 'flex', gap: '10px', padding: '20px', overflowX: 'auto' },
    chip: { padding: '8px 18px', borderRadius: '20px', border: 'none', backgroundColor: '#F3F4F6', color: '#666', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' },
    chipActive: { backgroundColor: '#11A5D1', color: '#fff' },
    list: { flex: 1, overflowY: 'auto', padding: '0 20px' },
    chatItem: { display: 'flex', alignItems: 'center', marginBottom: '25px', cursor: 'pointer' },
    avatarContainer: { position: 'relative', marginRight: '15px' },
    avatar: { width: '55px', height: '55px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
    onlineStatus: { position: 'absolute', bottom: 2, right: 2, width: '12px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '50%', border: '2px solid #fff' },
    chatInfo: { flex: 1 },
    chatHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
    vendorName: { fontWeight: 'bold', fontSize: '15px' },
    timeText: { fontSize: '11px', color: '#11A5D1', fontWeight: 'bold' },
    msgRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    msgPreview: { fontSize: '13px', color: '#11A5D1', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    badge: { backgroundColor: '#11A5D1', color: '#fff', fontSize: '10px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fab: { position: 'absolute', bottom: '80px', right: '20px', width: '55px', height: '55px', borderRadius: '50%', backgroundColor: '#11A5D1', color: '#fff', border: 'none', fontSize: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' },
    bottomNav: { borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '10px 0', backgroundColor: '#fff' },
    navItem: { textAlign: 'center', fontSize: '18px', color: '#999', cursor: 'pointer' },
    navText: { fontSize: '9px', fontWeight: 'bold' }
};

export default Conversations;