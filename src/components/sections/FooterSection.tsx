import { motion } from "framer-motion";
import { Zap, Twitter, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Platform: ["Dashboard", "Marketplace", "Gamification", "Carbon Impact"],
  Resources: ["Documentation", "API Reference", "Smart Contracts", "Whitepaper"],
  Company: ["About Us", "Careers", "Press Kit", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Disclaimer"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export const FooterSection = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="absolute inset-0 gradient-dark" />
      
      <div className="container relative z-10 px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Zap className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                Ener<span className="text-primary">Chain</span>
              </span>
            </motion.a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Blockchain-powered renewable energy tokenization. Harvest clean energy, anywhere.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 EnerChain. All rights reserved. Built on Solana.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Solana Devnet
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
