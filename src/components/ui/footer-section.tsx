"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter, Activity, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "../../i18n/TranslationContext"

function Footerdemo() {
  const { t } = useTranslation();

  return (
    <footer className="relative border-t bg-black text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="ScamShield Logo" className="size-10 object-contain" referrerPolicy="no-referrer" />
              <span className="text-xl font-black tracking-tighter uppercase">ScamShield</span>
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">{t('footer.stay_secure')}</h2>
            <p className="mb-6 text-zinc-400 text-sm">
              {t('footer.newsletter.desc')}
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="pr-12 bg-white/5 border-white/10 rounded-xl h-12 text-sm focus:ring-white/20"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg bg-white text-black transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-white/5 blur-2xl -z-10" />
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white/40">{t('footer.product.title')}</h3>
            <nav className="space-y-4 text-sm font-medium">
              <Link to="/#about" className="block text-zinc-400 transition-colors hover:text-white">
                {t('footer.product.about')}
              </Link>
              <Link to="/#features" className="block text-zinc-400 transition-colors hover:text-white">
                {t('footer.product.features')}
              </Link>
              <Link to="/#faqs" className="block text-zinc-400 transition-colors hover:text-white">
                {t('footer.product.faq')}
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white/40">{t('footer.hq_title')}</h3>
            <address className="space-y-4 text-sm not-italic text-zinc-400">
              <p className="flex items-center gap-2">
                124 Digital Defense Way
              </p>
              <p>Security Hub, Suite 404</p>
              <p className="pt-2">Phone: +1 (800) CYBER-SAFE</p>
              <p>Email: security@scamshield.ai</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white/40">{t('footer.connect')}</h3>
            <div className="mb-8 flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-900 border-white/10 text-white">
                    <p>{t('footer.social_tooltips.facebook')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-900 border-white/10 text-white">
                    <p>{t('footer.social_tooltips.twitter')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-900 border-white/10 text-white">
                    <p>{t('footer.social_tooltips.instagram')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-900 border-white/10 text-white">
                    <p>{t('footer.social_tooltips.linkedin')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-center md:flex-row">
          <p className="text-xs font-medium text-zinc-500">
            {t('footer.copyright')}
          </p>
          <nav className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <Link to="/privacy" className="transition-colors hover:text-white">
              {t('footer.company.privacy')}
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              {t('footer.company.terms')}
            </Link>
            <Link to="/safety" className="transition-colors hover:text-white">
              {t('footer.company.digital_safety')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }


