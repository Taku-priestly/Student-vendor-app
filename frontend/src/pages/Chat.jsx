import React from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                {/* Header */}
                <header style={styles.header}>
                    <button onClick={() => navigate('/')} style={styles.backBtn}>←</button>
                    <div style={styles.headerInfo}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={styles.vendorName}>La Marquise</span>
                            <div style={styles.onlineDot}></div>
                        </div>
                        <span style={styles.statusText}>TYPICALLY REPLIES IN 2 MINS</span>
                    </div>
                    <button style={styles.viewOrderBtn}>View Order</button>
                </header>

                {/* Chat Area */}
                <div style={styles.chatArea}>
                    <div style={styles.dateDivider}>TODAY</div>
                    
                    <div style={styles.vendorMsgRow}>
                        <div style={styles.avatarVendor}>🍔</div>
                        <div style={styles.msgContainer}>
                            <div style={styles.vendorBubble}>
                                Hi there! Your burger is almost ready! 🍔 We're just adding the finishing touches.
                            </div>
                            <span style={styles.timestamp}>12:13 PM</span>
                        </div>
                    </div>

                    <div style={styles.myMsgRow}>
                        <div style={styles.msgContainer}>
                            <div style={styles.myBubble}>
                                Great! I'm coming now. Should be there in 5 minutes.
                            </div>
                            <span style={styles.timestamp}>12:14 PM</span>
                        </div>
                        <div style={styles.avatarMe}>👩</div>
                    </div>
                </div>

                {/* Footer */}
                <footer style={styles.footer}>
                    <div style={styles.quickReplies}>
                        <button style={styles.chip}>On my way!</button>
                        <button style={styles.chip}>Thank you! 🙌</button>
                        <button style={styles.chip}>Where are you?</button>
                    </div>
                    <div style={styles.inputRow}>
                        <button style={styles.plusBtn}>+</button>
                        <input style={styles.input} placeholder="Type a message..." />
                        <button style={styles.sendBtn}>➤</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: { backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' },
    container: { width: '100%', maxWidth: '500px', height: '100vh', backgroundColor: '#F8FAFB', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', boxShadow: '0 0 20px rgba(0,0,0,0.1)' },
    header: { padding: '15px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' },
    backBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' },
    headerInfo: { flex: 1, marginLeft: '10px' },
    vendorName: { fontWeight: 'bold', fontSize: '16px' },
    onlineDot: { width: '8px', height: '8px', backgroundColor: '#4CAF50', borderRadius: '50%', marginLeft: '5px' },
    statusText: { fontSize: '10px', color: '#00BCD4', fontWeight: 'bold' },
    viewOrderBtn: { background: 'none', border: 'none', color: '#00BCD4', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' },
    chatArea: { flex: 1, padding: '20px', overflowY: 'auto' },
    dateDivider: { textAlign: 'center', color: '#999', fontSize: '12px', margin: '20px 0' },
    vendorMsgRow: { display: 'flex', marginBottom: '20px' },
    myMsgRow: { display: 'flex', marginBottom: '20px', justifyContent: 'flex-end' },
    avatarVendor: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2C2C2E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' },
    avatarMe: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFD1D1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' },
    msgContainer: { maxWidth: '75%' },
    vendorBubble: { backgroundColor: '#fff', padding: '12px', borderRadius: '15px 15px 15px 0', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    myBubble: { backgroundColor: '#11A5D1', color: '#fff', padding: '12px', borderRadius: '15px 15px 0 15px', fontSize: '14px' },
    timestamp: { fontSize: '10px', color: '#999', marginTop: '4px', display: 'block' },
    footer: { padding: '15px', backgroundColor: '#fff' },
    quickReplies: { display: 'flex', gap: '8px', marginBottom: '10px', overflowX: 'auto' },
    chip: { padding: '8px 15px', borderRadius: '20px', border: '1px solid #E0F7FA', backgroundColor: '#E0F7FA', color: '#11A5D1', fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer' },
    inputRow: { display: 'flex', alignItems: 'center', gap: '10px' },
    plusBtn: { fontSize: '24px', color: '#ccc', border: 'none', background: 'none', cursor: 'pointer' },
    input: { flex: 1, padding: '12px', borderRadius: '25px', border: '1px solid #eee', backgroundColor: '#F3F4F6', outline: 'none' },
    sendBtn: { backgroundColor: '#11A5D1', color: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }
};

export default Chat;