import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewConversation = () => {
    const navigate = useNavigate();

    const vendors = [
        { id: 'v1', name: "La Marquise", category: "Burgers & Grill", icon: "🍔" },
        { id: 'v2', name: "Boulangerie saker", category: "Bakery", icon: "🍞" },
        { id: 'v3', name: "Bubbles", category: "Drinks", icon: "🥤" },
        { id: 'v4', name: "Pizza Hub", category: "Italian", icon: "🍕" },
        { id: 'v5', name: "Noodle House", category: "Asian", icon: "🍜" },
    ];

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backBtn}>✕</button>
                <h2 style={styles.title}>New Message</h2>
                <div style={{ width: 24 }}></div> {/* Spacer for centering */}
            </div>

            {/* Search */}
            <div style={styles.searchBox}>
                <span style={{ color: '#999', marginRight: 10 }}>To:</span>
                <input style={styles.input} placeholder="Type a vendor name..." autoFocus />
            </div>

            {/* Suggestions */}
            <div style={styles.list}>
                <p style={styles.sectionTitle}>SUGGESTED VENDORS</p>
                {vendors.map(vendor => (
                    <div 
                        key={vendor.id} 
                        style={styles.vendorItem} 
                        onClick={() => navigate(`/chat/${vendor.id}`)}
                    >
                        <div style={styles.avatar}>{vendor.icon}</div>
                        <div>
                            <div style={styles.vendorName}>{vendor.name}</div>
                            <div style={styles.categoryText}>{vendor.category}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { height: '100vh', backgroundColor: '#fff', fontFamily: 'sans-serif' },
    header: { padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' },
    backBtn: { border: 'none', background: 'none', fontSize: '20px', color: '#666', cursor: 'pointer' },
    title: { fontSize: '18px', fontWeight: 'bold', margin: 0 },
    searchBox: { padding: '15px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' },
    input: { border: 'none', outline: 'none', flex: 1, fontSize: '15px' },
    list: { padding: '20px' },
    sectionTitle: { fontSize: '11px', color: '#999', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '0.5px' },
    vendorItem: { display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' },
    avatar: { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginRight: '15px' },
    vendorName: { fontWeight: 'bold', fontSize: '15px', marginBottom: '2px' },
    categoryText: { fontSize: '12px', color: '#999' }
};

export default NewConversation;