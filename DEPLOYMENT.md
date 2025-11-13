# 🚀 Guía de Deployment - Cloudflare Pages

## 📍 URLs del Proyecto

### **Producción:**
- **GitHub Pages**: https://liusc45.github.io/brisspedir/
- **Cloudflare Pages**: https://f4b16383.quieres-ser-mi-novia.pages.dev

---

## ⚡ Comandos para Actualizar

### **Opción 1: Usar Wrangler (Recomendado)**
```bash
# 1. Desplegar cambios automáticamente
npx wrangler@latest pages deploy . --project-name=quieres-ser-mi-novia --branch=main

# 2. O con commit-dirty si hay cambios sin commit
npx wrangler@latest pages deploy . --project-name=quieres-ser-mi-novia --branch=main --commit-dirty=true
```

### **Opción 2: Desde GitHub (Automático)**
```bash
# Hacer commit y push a main
git add .
git commit -m "feat: descripción del cambio"
git push origin main

# Cloudflare detectará automáticamente el cambio y hará deploy
```

---

## 🔧 Configuración Inicial (Ya completada)

### **Wrangler Setup:**
```bash
# 1. Instalar Wrangler (usando npx, no global)
npx wrangler@latest --version

# 2. Autenticarse (solo la primera vez)
npx wrangler@latest login

# 3. Crear proyecto (solo la primera vez)
npx wrangler@latest pages project create quieres-ser-mi-novia --production-branch=main --compatibility-date=2024-01-01
```

---

## 📊 Ver Deployments

### **Listar todos los deployments:**
```bash
npx wrangler@latest pages deployment list --project-name=quieres-ser-mi-novia
```

### **Ver detalles de un deployment específico:**
```bash
npx wrangler@latest pages deployment tail --project-name=quieres-ser-mi-novia
```

---

## 🌍 Configuración de Dominio

### **Dominio personalizado:**
El proyecto ya tiene un dominio personalizado configurado:
- **URL**: https://quieres-ser-mi-novia.pages.dev

### **Para cambiar a tu propio dominio:**
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona el proyecto `quieres-ser-mi-novia`
3. Ve a **Custom Domains**
4. Haz clic en **Set up a custom domain**
5. Sigue las instrucciones

---

## 📁 Estructura de Archivos

```
/
├── index.html          # Página principal
├── src/
│   ├── styles.css     # Estilos principales
│   ├── modal.css      # Estilos de modales
│   ├── js.js          # Lógica del botón NO
│   └── modal.js       # Lógica de modales
├── img/               # Imágenes
│   ├── logo.png
│   ├── declaracion.jpg
│   └── meme.jpg
└── media/             # Archivos multimedia
```

---

## 🎨 Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos con variables y gradientes
- **JavaScript Vanilla** - Interactividad
- **Glassmorphism** - Efectos visuales
- **Cloudflare Pages** - Hosting y CDN

---

## 🔄 Actualizaciones Rápidas

### **Para cambios menores (1 minuto):**
```bash
# Hacer cambios → Deploy directo
npx wrangler@latest pages deploy . --project-name=quieres-ser-mi-novia --branch=main
```

### **Para cambios con Git (Recomendado):**
```bash
# 1. Hacer cambios en los archivos
# 2. Commitear
git add .
git commit -m "🎨 feat: nueva funcionalidad"

# 3. Push (Cloudflare se actualiza automáticamente)
git push origin main

# 4. Deploy manual opcional (si quieres asegurar)
npx wrangler@latest pages deploy . --project-name=quieres-ser-mi-novia --branch=main
```

---

## ⚠️ Notas Importantes

1. **Tiempo de propagación**: Los cambios pueden tardar 1-2 minutos en aparecer
2. **Cache**: Cloudflare caché automáticamente las páginas estáticas
3. **Errors**: Si hay errores de build, revisalos en el dashboard de Cloudflare
4. **Tamaño**: El proyecto debe ser < 25MB (no es problema aquí)

---

## 🆘 Troubleshooting

### **Error de autenticación:**
```bash
# Re-autenticarse
npx wrangler@latest logout
npx wrangler@latest login
```

### **Error "Project not found":**
```bash
# Ver proyectos disponibles
npx wrangler@latest pages project list
```

### **Deployment falló:**
```bash
# Ver logs detallados
npx wrangler@latest pages deployment tail --project-name=quieres-ser-mi-novia
```

---

## 📞 Soporte

- **Documentación Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Wrangler CLI Docs**: https://developers.cloudflare.com/workers/wrangler/
- **Dashboard Cloudflare**: https://dash.cloudflare.com/

---

**¡Listo! Con estos comandos puedes actualizar el sitio en segundos** 🚀✨