import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Flame, 
  Crown, 
  Gamepad2, 
  Stars, 
  Music, 
  Smile, 
  Instagram, 
  MessageCircle, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';

interface QuickPresetsProps {
  onSelectPreset: (presetText: string) => void;
  currentText: string;
  currentRoute?: PageRoute;
}

interface PresetTag {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const ROUTE_PRESETS: Record<PageRoute, PresetTag[]> = {
  inicio: [
    { id: '1', label: 'Mi Nombre', value: 'Mi Nombre Aesthetic', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
    { id: '2', label: 'Free Fire Pro', value: '亗 PRO GAMER 亗', icon: <Flame className="w-3 h-3 text-amber-500" /> },
    { id: '3', label: 'Queen / Reyna', value: '👑 Queen Girl 👑', icon: <Crown className="w-3 h-3 text-yellow-500" /> },
    { id: '4', label: 'Aesthetic Girl', value: '🌸 Aesthetic Vibes 🌸', icon: <Stars className="w-3 h-3 text-pink-500" /> },
    { id: '5', label: 'Te Amo Amor', value: 'Te amo con todo mi corazón ♥', icon: <Heart className="w-3 h-3 text-rose-500" /> },
    { id: '6', label: 'Alas FF', value: '꧁༺ DESTRUCTOR ༻꧂', icon: <Gamepad2 className="w-3 h-3 text-violet-500" /> },
    { id: '7', label: 'Sad Boy / Girl', value: '🖤 Broken Heart 🖤', icon: <Music className="w-3 h-3 text-slate-500" /> },
    { id: '8', label: 'Dios es Amor', value: '✞ Dios es mi guía y fortaleza ✞', icon: <Smile className="w-3 h-3 text-sky-500" /> },
    { id: '9', label: 'Insta Bio', value: 'Creador de Contenido · España ✈️', icon: <TrendingUp className="w-3 h-3 text-emerald-500" /> },
  ],
  instagram: [
    { id: 'ig1', label: '✨ Lifestyle Bio', value: 'Living my best life ✨ Daily vibes & style', icon: <Stars className="w-3 h-3 text-pink-500" /> },
    { id: 'ig2', label: '📸 Content Creator', value: 'Creador de Contenido 📸 · Contacto DM', icon: <Sparkles className="w-3 h-3 text-purple-500" /> },
    { id: 'ig3', label: '🌿 Minimalist', value: '🌿 plant lover · coffee & art · madrid', icon: <Smile className="w-3 h-3 text-emerald-500" /> },
    { id: 'ig4', label: '✈️ Travel & Explore', value: 'Exploring the world ✈️ Next stop: Tokio', icon: <TrendingUp className="w-3 h-3 text-sky-500" /> },
    { id: 'ig5', label: '💌 Frase de Amor', value: 'Tú eres mi lugar favorito en el mundo ♥', icon: <Heart className="w-3 h-3 text-rose-500" /> },
    { id: 'ig6', label: '💄 Beauty & Glow', value: 'Fashion & Glow 💄 Tips diarios de skincare', icon: <Crown className="w-3 h-3 text-amber-500" /> },
  ],
  'free-fire': [
    { id: 'ff1', label: '亗 Rey Insano', value: '亗 ɢᴏᴅ ᴏғ ᴡᴀʀ 亗', icon: <Flame className="w-3 h-3 text-amber-500" /> },
    { id: 'ff2', label: '꧁༺ Alas Pro ༻꧂', value: '꧁༺ ˢᴬᴰ ᴮᴼᵞ ༻꧂', icon: <Gamepad2 className="w-3 h-3 text-orange-500" /> },
    { id: 'ff3', label: 'ᴮᴼˢˢ Clan VIP', value: 'ᴮᴼˢˢ★ ᴠɪᴘ ᴛᴇᴀᴍ', icon: <Crown className="w-3 h-3 text-yellow-500" /> },
    { id: 'ff4', label: '⚡ Rayo Kill', value: '⚡ ᴋɪʟʟᴇʀ ɪɴsᴀɴᴏ ⚡', icon: <Sparkles className="w-3 h-3 text-violet-500" /> },
    { id: 'ff5', label: '⚔️ Duelo PvP', value: '⚔️ ᴅᴜᴇʟᴏ ᴅᴇ ᴇsᴄᴜᴀᴅʀᴀs ⚔️', icon: <Flame className="w-3 h-3 text-rose-500" /> },
    { id: 'ff6', label: '👑 Tóxico FF', value: '☠️ ᴛᴏxɪᴄ ʙᴏʏ ☠️', icon: <Crown className="w-3 h-3 text-slate-500" /> },
  ],
  cursiva: [
    { id: 'cur1', label: '𝓣𝓮 𝓐𝓶𝓸 ♥', value: 'Te amo con toda mi alma ♥', icon: <Heart className="w-3 h-3 text-rose-500" /> },
    { id: 'cur2', label: '𝓕𝓻𝓪𝓼𝓮 𝓑𝓸𝓷𝓲𝓽𝓪', value: 'La vida es bella cuando sonríes ✨', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
    { id: 'cur3', label: '𝓝𝓸𝓶𝓫𝓻𝓮 𝓔𝓵𝓮𝓰𝓪𝓷𝓽𝓮', value: 'Valeria Sofía · Diseñadora', icon: <Crown className="w-3 h-3 text-amber-500" /> },
    { id: 'cur4', label: '𝓜𝓲 𝓟𝓻𝓲𝓷𝓬𝓮𝓼𝓪', value: 'Eres mi princesa hermosa 👑', icon: <Stars className="w-3 h-3 text-pink-500" /> },
    { id: 'cur5', label: '𝒮𝒸𝓇𝒾𝓅𝓉 𝒱𝒾𝒷𝑒𝓈', value: 'Dreams come true when you believe', icon: <Smile className="w-3 h-3 text-purple-500" /> },
  ],
  goticas: [
    { id: 'got1', label: '𝔇𝔞𝔯𝔨𝔫𝔢𝔰𝔰', value: 'In the shadow of the night ✞', icon: <Crown className="w-3 h-3 text-slate-700" /> },
    { id: 'got2', label: '𝕲𝖔𝖙𝖍𝖎𝖈 𝕾𝖔𝖚𝖑', value: 'Gothic soul & Dark poetry', icon: <Sparkles className="w-3 h-3 text-purple-600" /> },
    { id: 'got3', label: '𝔅𝔩𝔞𝔠𝔨 𝕽𝖔𝖘𝖊', value: 'Black Rose · Pure Elegance 🌹', icon: <Heart className="w-3 h-3 text-rose-700" /> },
    { id: 'got4', label: '𝕿𝖆𝖙𝖙𝖔𝖔 𝕬𝖗𝖙', value: 'Old English Tattoo Lettering', icon: <Flame className="w-3 h-3 text-amber-600" /> },
    { id: 'got5', label: '𝕸𝖊𝖉𝖎𝖊𝖛𝖆𝖑', value: 'King of the Forgotten Realm ⚔️', icon: <Gamepad2 className="w-3 h-3 text-slate-800" /> },
  ],
  whatsapp: [
    { id: 'wa1', label: '🎉 Cumpleaños', value: '¡Feliz Cumpleaños! Que Dios te bendiga mucho 🎉🎂', icon: <Sparkles className="w-3 h-3 text-emerald-500" /> },
    { id: 'wa2', label: '⚠️ Aviso Urgente', value: '⚠️ ATENCIÓN: Reunión urgente a las 4:00 PM', icon: <TrendingUp className="w-3 h-3 text-amber-500" /> },
    { id: 'wa3', label: '🌴 Vacaciones', value: '🌴 Modo vacaciones activado · No llamadas', icon: <Smile className="w-3 h-3 text-teal-500" /> },
    { id: 'wa4', label: '🙏 Bendiciones', value: 'Que tengas un día lleno de paz y bendiciones 🙏', icon: <Heart className="w-3 h-3 text-sky-500" /> },
    { id: 'wa5', label: '💼 Negocios', value: 'Hola, gracias por comunicarte con nosotros 🤝', icon: <MessageCircle className="w-3 h-3 text-emerald-600" /> },
  ],
  tiktok: [
    { id: 'tt1', label: '✨ Aesthetic POV', value: 'POV: Cuando por fin encuentras la mejor música ✨', icon: <Stars className="w-3 h-3 text-pink-500" /> },
    { id: 'tt2', label: '⚡ Viral Trend', value: '⚡ Follow for daily dances & humor 😂', icon: <TrendingUp className="w-3 h-3 text-indigo-500" /> },
    { id: 'tt3', label: '🖤 Emo / Grunge', value: '🖤 listening to slow reverb songs 🎧', icon: <Music className="w-3 h-3 text-slate-600" /> },
    { id: 'tt4', label: '🍓 Kawaii Vibes', value: '🍓 pastel pink lover 🎀', icon: <Heart className="w-3 h-3 text-rose-400" /> },
    { id: 'tt5', label: '🎧 Gamer Stream', value: '🎧 Streamer & gamer girl 🎮 Directo hoy', icon: <Gamepad2 className="w-3 h-3 text-purple-500" /> },
  ],
  facebook: [
    { id: 'fb1', label: '📢 Anuncio Grupo', value: '📢 ATENCIÓN COMUNIDAD: Información importante', icon: <TrendingUp className="w-3 h-3 text-blue-500" /> },
    { id: 'fb2', label: '🛍️ Venta / Marketplace', value: '🛍️ ¡Gran Oportunidad! Producto en excelente estado', icon: <Crown className="w-3 h-3 text-amber-500" /> },
    { id: 'fb3', label: '🎂 Felicitaciones', value: '🎂 Muchas felicidades en tu día especial', icon: <Heart className="w-3 h-3 text-rose-500" /> },
    { id: 'fb4', label: '✨ Reflexión', value: '✨ El éxito llega para quienes nunca se rinden', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
  ],
  'letras-chidas': [
    { id: 'ch1', label: '🇲🇽 El Patrón', value: 'El Patrón Insano 亗', icon: <Flame className="w-3 h-3 text-amber-500" /> },
    { id: 'ch2', label: '⚡ Tóxica Chida', value: 'La Tóxica Real 👑', icon: <Crown className="w-3 h-3 text-rose-500" /> },
    { id: 'ch3', label: '⚔️ Bélico Pro', value: 'Bélico Pesado ⚔️', icon: <Gamepad2 className="w-3 h-3 text-slate-700" /> },
    { id: 'ch4', label: '✨ Frase Perrona', value: 'Viviendo a mi manera, sin prisas ✨', icon: <Sparkles className="w-3 h-3 text-amber-600" /> },
    { id: 'ch5', label: '🔥 Flow Insano', value: 'Flow Pesado 999 ⚡', icon: <TrendingUp className="w-3 h-3 text-orange-500" /> },
  ],
  'letras-elegantes': [
    { id: 'el1', label: '💎 Lujo Editorial', value: 'Valentina Gómez · Art Director', icon: <Crown className="w-3 h-3 text-indigo-500" /> },
    { id: 'el2', label: '✍️ Firma Real', value: 'José María Silva ✧', icon: <Sparkles className="w-3 h-3 text-purple-500" /> },
    { id: 'el3', label: '🌹 Dedicatoria Fina', value: 'Siempre tuya con amor eterno ♡', icon: <Heart className="w-3 h-3 text-rose-500" /> },
    { id: 'el4', label: '☕ Minimalist Bio', value: 'Coffee, art & minimalism ✨', icon: <Smile className="w-3 h-3 text-slate-600" /> },
  ],
  'letras-raras': [
    { id: 'ra1', label: '尺 Oriental', value: '尺卂尺卂丂 ﾘ ㄥㄖ匚卂丂', icon: <Crown className="w-3 h-3 text-purple-500" /> },
    { id: 'ra2', label: 'ᚱ Rúnico', value: 'ᚱᚢᚾᚨᛊ ᛗᛁᛊᛏᛁᚲᚨᛊ', icon: <Gamepad2 className="w-3 h-3 text-slate-700" /> },
    { id: 'ra3', label: '👁️ Jeroglíficos', value: '𓁹 𓁺 𓁻 𓁼 𓁿 𓁹', icon: <Sparkles className="w-3 h-3 text-purple-600" /> },
    { id: 'ra4', label: 'Z̶ Zalgo Maldito', value: 'Maldición Oscura ✞', icon: <Flame className="w-3 h-3 text-rose-600" /> },
  ],
  'letras-tatuajes': [
    { id: 'tat1', label: '💉 Amor Fati', value: 'Amor Fati ✦ 𝔄𝔪𝔬𝔯 𝔉𝔞𝔱𝔦', icon: <Sparkles className="w-3 h-3 text-amber-500" /> },
    { id: 'tat2', label: '† Memento Mori', value: 'Memento Mori † 𝕸𝖊𝖒𝖊𝖓𝖙𝖔 𝕸𝖔𝖗𝖎', icon: <Flame className="w-3 h-3 text-stone-500" /> },
    { id: 'tat3', label: '⚔️ Veni Vidi Vici', value: 'ᴠᴇɴɪ · ᴠɪᴅɪ · ᴠɪᴄɪ ⚔️', icon: <Crown className="w-3 h-3 text-amber-600" /> },
    { id: 'tat4', label: '🌹 Familia Primero', value: '𝕱𝖆𝖒𝖎𝖑𝖎𝖆 𝕻𝖗𝖎𝖒𝖊𝖗𝖔 ♡', icon: <Heart className="w-3 h-3 text-rose-500" /> },
  ],
  'nicks-free-fire': [
    { id: 'nff1', label: '꧁ Alas Insanas ꧂', value: '꧁༺ 𝕰𝖑 𝕻𝖆𝖙𝖗ó𝖓 ༻꧂', icon: <Flame className="w-3 h-3 text-red-500" /> },
    { id: 'nff2', label: 'ⓥ Verificado 999', value: 'ⓥ 𝕴𝕹𝕾𝕬𝕹𝕺 ⁹⁹⁹', icon: <Crown className="w-3 h-3 text-amber-500" /> },
    { id: 'nff3', label: '︻╦╤─ MP40 PvP', value: '︻╦╤─ 𝕭𝖊𝖑𝖎𝖈𝖔 亗', icon: <Gamepad2 className="w-3 h-3 text-slate-700" /> },
    { id: 'nff4', label: 'ᴮᴼˢˢ Clan Leader', value: 'ᴮᴼˢˢ★ 𝕲𝖍𝖔𝖘𝖙 亗', icon: <Sparkles className="w-3 h-3 text-orange-500" /> },
  ],
  'letras-chinas': [
    { id: 'ch_as1', label: '尺 Simulado', value: '尺卂尺ㄖ ﾘ 匚卄丨刀ㄖ', icon: <Crown className="w-3 h-3 text-rose-500" /> },
    { id: 'ch_as2', label: '🐉 Dragón 龍', value: '🐉 𓆩 龍 · 𝕯𝖗𝖆𝖌𝖔𝖓 𓆪 🐉', icon: <Flame className="w-3 h-3 text-red-600" /> },
    { id: 'ch_as3', label: '🌸 Sakura 桜', value: '🌸 𝒱𝒾𝒷𝑒𝓈 𝒮𝒶𝓀𝓊𝓇𝒶 桜 🌸', icon: <Heart className="w-3 h-3 text-pink-500" /> },
    { id: 'ch_as4', label: '愛 Amor Kanji', value: '愛 𝓣𝓮 𝓐𝓶𝓸 愛', icon: <Sparkles className="w-3 h-3 text-rose-400" /> },
  ],
  'espacio-invisible': [
    { id: 'esp1', label: '👻 Espacio [ㅤ]', value: '亗ㅤFL𝑶𝑾ㅤ亗', icon: <Sparkles className="w-3 h-3 text-indigo-400" /> },
    { id: 'esp2', label: 'ⓥ Verificado Espacio', value: 'ⓥㅤ𝕴𝕹𝕾𝕬𝕹𝕺', icon: <Crown className="w-3 h-3 text-amber-400" /> },
    { id: 'esp3', label: 'ᴮᴼˢˢ Tag Separado', value: 'ᴮᴼˢˢㅤ★ㅤ𝕲𝖍𝖔𝖘𝖙', icon: <Flame className="w-3 h-3 text-red-400" /> },
  ],
  'nombres-parejas': [
    { id: 'np1', label: '👑 Rey & Reina', value: '『 𝓔𝓵 𝓡𝓮𝔂 』 亗 ♡ 『 𝓛𝓪 𝓡𝓮𝓲𝓷𝓪 』 亗', icon: <Crown className="w-3 h-3 text-amber-500" /> },
    { id: 'np2', label: '🔥 Bonnie & Clyde', value: '亗 𝑩𝑶𝑵𝑵𝑰𝑬 亗 ♡ 亗 𝑪𝑳𝒀𝑫𝑬 亗', icon: <Flame className="w-3 h-3 text-red-500" /> },
    { id: 'np3', label: '☀️ Sol & Luna', value: '☀️ 𝒮𝑜𝓁 ♡ 🌙 𝐿𝓊𝓃𝒶', icon: <Heart className="w-3 h-3 text-rose-500" /> },
    { id: 'np4', label: '⚡ Adán & Eva', value: '⚡ 𝕬𝖉𝖆𝖓 ♡ 𝕰𝖛𝖆 ⚡', icon: <Sparkles className="w-3 h-3 text-indigo-400" /> },
  ],
  'abecedario': [
    { id: 'abc1', label: '𝔄-𝔅-ℭ Gótico', value: '𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊', icon: <Crown className="w-3 h-3 text-amber-600" /> },
    { id: 'abc2', label: '𝓐-𝓑-𝓒 Cursiva', value: '𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖', icon: <Heart className="w-3 h-3 text-indigo-500" /> },
    { id: 'abc3', label: '🅐-🅑-🅒 Círculos', value: '🅐 🅑 🅒 🅓 🅔 🅕 🅖', icon: <Sparkles className="w-3 h-3 text-purple-500" /> },
  ],
  invertidas: [
    { id: 'inv1', label: 'ɐpıʇɹǝʌuI', value: 'Hola mundo al revés 🙃', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
    { id: 'inv2', label: 't̶a̶c̶h̶a̶d̶o̶', value: 'Texto tachado secreto', icon: <TrendingUp className="w-3 h-3 text-slate-500" /> },
    { id: 'inv3', label: 'oɾǝdsƎ', value: 'Escribiendo en modo espejo', icon: <Smile className="w-3 h-3 text-violet-500" /> },
  ],
  circulos: [
    { id: 'cir1', label: '🅑🅤🅡🅑🅤🅙🅐🅢', value: 'Letras en burbujas negras', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
    { id: 'cir2', label: 'ⒸⒾⓇⒸⓊⓁⓄⓈ', value: 'Letras en círculos blancos', icon: <Smile className="w-3 h-3 text-cyan-500" /> },
    { id: 'cir3', label: '🄲🅄🄰🄳🅁🄾🅂', value: 'Letras en cajas cuadradas', icon: <Crown className="w-3 h-3 text-purple-500" /> },
  ],
  glitch: [
    { id: 'gl1', label: 'Z̷a̷l̷g̸o̸', value: 'H̴E̴L̴P̴ ̵M̴E̴ ̷P̷L̷E̷A̷S̷E̴', icon: <Flame className="w-3 h-3 text-rose-600" /> },
    { id: 'gl2', label: 'Error 404', value: 'E̷R̷R̷O̷R̷ ̷4̷0̷4̷ ̵S̷O̷U̷L̷ ̷N̷O̷T̷ ̵F̷O̷U̷N̷D̷', icon: <Sparkles className="w-3 h-3 text-purple-600" /> },
  ],
  simbolos: [
    { id: 'sym1', label: 'Alas & Coronas', value: '꧁༺ 👑 ༻꧂', icon: <Crown className="w-3 h-3 text-yellow-500" /> },
    { id: 'sym2', label: 'Aesthetic Stars', value: '｡･:*:･ﾟ★,｡･:*:･ﾟ☆', icon: <Stars className="w-3 h-3 text-pink-500" /> },
    { id: 'sym3', label: 'Corazones & Amor', value: '♥ (⁠灬⁠º⁠‿⁠º⁠灬⁠)⁠♡', icon: <Heart className="w-3 h-3 text-rose-500" /> },
  ],
  decorador: [
    { id: 'dec1', label: 'Marco Pro', value: '★彡 [Tu Nombre] 彡★', icon: <Stars className="w-3 h-3 text-amber-500" /> },
    { id: 'dec2', label: 'Alas Divinas', value: '꧁༺ Rey ༻꧂', icon: <Flame className="w-3 h-3 text-orange-500" /> },
    { id: 'dec3', label: 'Flores Kawaii', value: '🌸｡.:* Valeria *.:｡🌸', icon: <Heart className="w-3 h-3 text-pink-500" /> },
  ],
  'contador-bio': [
    { id: 'cb1', label: 'Bio 150 IG', value: '✨ Diseñador & Creador Digital 🎨\n📍 Madrid · España ✈️\n👇 Descarga mis recursos aquí', icon: <Instagram className="w-3 h-3 text-pink-500" /> },
    { id: 'cb2', label: 'Bio 80 TikTok', value: 'Daily lifestyle & tips ✨ Sígueme para más videos', icon: <Sparkles className="w-3 h-3 text-purple-500" /> },
    { id: 'cb3', label: 'Nick 12 FF', value: '꧁༺ ᴿᴱᵞ ༻꧂', icon: <Flame className="w-3 h-3 text-amber-500" /> },
  ],
  'sobre-nosotros': [
    { id: 'sn1', label: 'Laboratorio', value: 'Laboratorio de Tipografías Unicode', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
  ],
  'politica-de-privacidad': [
    { id: 'pp1', label: 'Privacidad', value: 'Procesamiento Seguro 100% Local', icon: <ShieldCheck className="w-3 h-3 text-emerald-500" /> },
  ],
  'politica-de-cookies': [
    { id: 'pc1', label: 'Cookies', value: 'Gestión de Consentimiento RGPD', icon: <ShieldCheck className="w-3 h-3 text-amber-500" /> },
  ],
  'terminos-y-condiciones': [
    { id: 'tc1', label: 'Términos', value: 'Condiciones de Uso & Licencia Unicode', icon: <ShieldCheck className="w-3 h-3 text-indigo-500" /> },
  ],
  contacto: [
    { id: 'ct1', label: 'Soporte', value: 'Sugerencias de Fuentes & Soporte', icon: <MessageCircle className="w-3 h-3 text-sky-500" /> },
  ],
  '404': [
    { id: 'nf1', label: 'Inicio', value: 'Letras Bonitas', icon: <Sparkles className="w-3 h-3 text-indigo-500" /> },
  ],
};

export const QuickPresets: React.FC<QuickPresetsProps> = ({ 
  onSelectPreset, 
  currentText,
  currentRoute = 'inicio' 
}) => {
  const currentPresets = ROUTE_PRESETS[currentRoute] || ROUTE_PRESETS.inicio;

  const handleClick = (tag: PresetTag) => {
    onSelectPreset(tag.value);
  };

  return (
    <div className="mb-3.5">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-indigo-500" />
          <span>Ideas para {currentRoute === 'inicio' ? 'Empezar' : currentRoute.toUpperCase()}:</span>
        </span>
        <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
          (Toca una para probar al instante)
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
        {currentPresets.map((tag) => {
          const isSelected = currentText === tag.value;
          return (
            <button
              key={tag.id}
              type="button"
              id={`preset-tag-${tag.id}`}
              onClick={() => handleClick(tag)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-600 border-slate-200/90'
              }`}
            >
              {tag.icon}
              <span>{tag.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
