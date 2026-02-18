import React from 'react';
import { useNavigate } from 'react-router-dom';

const Call = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <div style={styles.topInfo}>
                    <span style={styles.callingText}>CALLING...</span>
                    <h1 style={styles.name}>Campus Grill</h1>
                </div>

                <div style={styles.avatarCircle}>
                    <div style={styles.avatarInner}>🍔</div>
                </div>

                <div style={styles.controls}>
                    <div style={styles.controlGroup}>
                        <button style={styles.roundBtn}>🎤</button>
                        <span style={styles.btnLabel}>Mute</span>
                    </div>

                    <div style={styles.controlGroup}>
                        <button 
                            style={{...styles.roundBtn, backgroundColor: '#FF3B30'}} 
                            onClick={() => navigate(-1)}
                        >
                            📞
                        </button>
                        <span style={styles.btnLabel}>End Call</span>
                    </div>

                    <div style={styles.controlGroup}>
                        <button style={styles.roundBtn}>🔊</button>
                        <span style={styles.btnLabel}>Speaker</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: { backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' },
    container: { 
        width: '100%', 
        maxWidth: '500px', 
        height: '100vh', 
        backgroundColor: '#11A5D1', 
        fontFamily: 'sans-serif', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '60px 0',
        color: '#fff',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    },
    topInfo: { textAlign: 'center' },
    callingText: { fontSize: '12px', letterSpacing: '2px', opacity: 0.8 },
    name: { fontSize: '28px', marginTop: '10px' },
    avatarCircle: { width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    avatarInner: { width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#2C2C2E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' },
    controls: { display: 'flex', gap: '30px', marginBottom: '40px' },
    controlGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    roundBtn: { width: '65px', height: '65px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    btnLabel: { fontSize: '12px', marginTop: '10px', opacity: 0.9 }
};

export default Call;