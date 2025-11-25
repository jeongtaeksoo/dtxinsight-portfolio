import React from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>Let's Connect</h2>
                <p className={styles.subtitle}>
                    Interested in collaboration or have questions about my work? I'd love to hear from you.
                </p>

                <div className={styles.links}>
                    <a href="mailto:contact@dtxinsight.com" className={styles.link}>
                        <Mail size={20} />
                        <span>contact@dtxinsight.com</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <Github size={20} />
                        <span>GitHub</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <Twitter size={20} />
                        <span>Twitter</span>
                    </a>
                </div>
            </div>

            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerContent}>
                        <p className={styles.copyright}>© 2025 DTX Insight. All rights reserved.</p>
                        <p className={styles.tagline}>Clinical Research × AI Innovation</p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
