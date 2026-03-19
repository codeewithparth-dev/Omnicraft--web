export default function Footer() {
    return (
        <footer className="site-footer">
            <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
                <div style={{ display: 'flex', gap: '16px', zIndex: 2 }}>
                    <a href="mailto:hello@omnicraft.com" target="_blank" rel="noopener noreferrer">
                        <img src="/social-gmail.svg" alt="Contact via Gmail" width="24" height="24" className="social-icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/social-instagram.svg" alt="Follow on Instagram" width="24" height="24" className="social-icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/social-facebook.svg" alt="Join us on Facebook" width="24" height="24" className="social-icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/social-twitter.svg" alt="Follow us on Twitter" width="24" height="24" className="social-icon" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/social-discord.svg" alt="Connect on Discord" width="24" height="24" className="social-icon" />
                    </a>
                </div>
                <span>Omnicraft Studio © {new Date().getFullYear()}</span>
                <span>All Rights Reserved</span>
            </div>
        </footer>
    );
}
