import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY is not set. Email features will not work.');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailParams): Promise<void> {
  const msg = {
    to,
    from: 'Daniel from AltChain <daniel@altchain.app>', // 👈 must match your verified sender
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('SendGrid Error:', errMsg);
    throw new Error('Email failed to send');
  }
}

/**
 * Send a waitlist confirmation email
 * @param email Recipient email address
 * @param language Language code for localization (en, es, fr, zh, ru)
 * @param name Optional name for personalization
 * @returns Promise indicating success/failure
 */
// Define supported languages
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'zh' | 'ru';

/**
 * Send a waitlist confirmation email
 * @param email Recipient email address
 * @param language Language code for localization (en, es, fr, zh, ru)
 * @param name Optional name for personalization
 * @returns Promise indicating success/failure
 */
export async function sendWaitlistConfirmation(email: string, language: SupportedLanguage = 'en', name = ''): Promise<void> {
  // Define email template structure
  type EmailTemplate = {
    subject: string;
    text: string;
    html: string;
  };
  
  // Define email templates for different languages
  const templates: Record<SupportedLanguage, EmailTemplate> = {
    en: {
      subject: 'Welcome to AltChain Waitlist',
      text: `Thank you for joining the AltChain waitlist!\n\nWe're excited to have you on board. You'll be among the first to know when we're ready to launch our AI-powered global sourcing platform.\n\nWant to help shape the future? Reply to this email and tell us what frustrates you most about global sourcing.\n\nVisit us at: https://altchain.app\n\nAltChain, Inc. | daniel@altchain.app`,
      html: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
  <div style="display: flex; align-items: center; margin-bottom: 24px;">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
      <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
  </div>

  <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
    Thank you for joining AltChain's waitlist!
  </h2>
  
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    We're excited to have you on board. You'll be among the first to know when we're ready to launch our AI-powered global sourcing platform.
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Want to help shape the future? Reply to this email and tell us what frustrates you most about global sourcing.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://altchain.app" target="_blank" style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
      Visit AltChain
    </a>
    <p style="margin-top: 10px; font-size: 12px;">
      If the button doesn't work, copy and paste this URL into your browser: <br>
      <a href="https://altchain.app" style="color: #4F46E5;"><strong>https://altchain.app</strong></a>
    </p>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center; margin-top: 24px;">
    You're receiving this email because you signed up at altchain.app<br>
    AltChain, Inc. | <a href="mailto:daniel@altchain.app" style="color: #999;">daniel@altchain.app</a>
  </p>
</div>`

    },
    es: {
      subject: 'Bienvenido a la Lista de Espera de AltChain',
      text: `¡Gracias por unirse a la lista de espera de AltChain!\n\nEstamos emocionados de tenerlo a bordo. Será de los primeros en saber cuando estemos listos para lanzar nuestra plataforma de abastecimiento global impulsada por IA.\n\n¿Quiere ayudar a dar forma al futuro? Responda a este correo electrónico y díganos qué le frustra más sobre el abastecimiento global.\n\nVisítenos en: https://altchain.app\n\nAltChain, Inc. | daniel@altchain.app`,
      html: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
  <div style="display: flex; align-items: center; margin-bottom: 24px;">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
      <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
  </div>

  <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
    ¡Bienvenido a la Lista de Espera de AltChain!
  </h2>
  
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    ¡Gracias por unirse a la lista de espera de AltChain!
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Estamos emocionados de tenerlo a bordo. Será de los primeros en saber cuando estemos listos para lanzar nuestra plataforma de abastecimiento global impulsada por IA.
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    ¿Quiere ayudar a dar forma al futuro? Responda a este correo electrónico y díganos qué le frustra más sobre el abastecimiento global.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://altchain.app" target="_blank" style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
      Visitar AltChain
    </a>
    <p style="margin-top: 10px; font-size: 12px;">
      Si el botón no funciona, copie y pegue esta URL en su navegador: <br>
      <a href="https://altchain.app" style="color: #4F46E5;"><strong>https://altchain.app</strong></a>
    </p>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center; margin-top: 24px;">
    Está recibiendo este correo porque se registró en altchain.app<br>
    AltChain, Inc. | <a href="mailto:daniel@altchain.app" style="color: #999;">daniel@altchain.app</a>
  </p>
</div>`
    },
    fr: {
      subject: 'Bienvenue sur la Liste d\'Attente AltChain',
      text: `Merci d'avoir rejoint la liste d'attente AltChain!\n\nNous sommes ravis de vous avoir à bord. Vous serez parmi les premiers à être informés quand nous serons prêts à lancer notre plateforme d'approvisionnement mondial alimentée par l'IA.\n\nVous souhaitez aider à façonner l'avenir? Répondez à cet e-mail et dites-nous ce qui vous frustre le plus dans l'approvisionnement mondial.\n\nVisitez-nous sur: https://altchain.app\n\nAltChain, Inc. | daniel@altchain.app`,
      html: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
  <div style="display: flex; align-items: center; margin-bottom: 24px;">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
      <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
  </div>

  <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
    Bienvenue sur la Liste d'Attente AltChain!
  </h2>
  
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Merci d'avoir rejoint la liste d'attente AltChain!
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Nous sommes ravis de vous avoir à bord. Vous serez parmi les premiers à être informés quand nous serons prêts à lancer notre plateforme d'approvisionnement mondial alimentée par l'IA.
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Vous souhaitez aider à façonner l'avenir? Répondez à cet e-mail et dites-nous ce qui vous frustre le plus dans l'approvisionnement mondial.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://altchain.app" target="_blank" style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
      Visiter AltChain
    </a>
    <p style="margin-top: 10px; font-size: 12px;">
      Si le bouton ne fonctionne pas, copiez et collez cette URL dans votre navigateur: <br>
      <a href="https://altchain.app" style="color: #4F46E5;"><strong>https://altchain.app</strong></a>
    </p>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center; margin-top: 24px;">
    Vous recevez cet e-mail car vous vous êtes inscrit sur altchain.app<br>
    AltChain, Inc. | <a href="mailto:daniel@altchain.app" style="color: #999;">daniel@altchain.app</a>
  </p>
</div>`
    },
    zh: {
      subject: '欢迎加入AltChain等候名单',
      text: `感谢您加入AltChain等候名单！\n\n我们很高兴有您的加入。当我们准备推出我们的AI驱动的全球采购平台时，您将成为最先知道的人之一。\n\n想帮助塑造未来吗？回复此电子邮件，告诉我们全球采购中最让您感到沮丧的是什么。\n\n访问我们: https://altchain.app\n\nAltChain, Inc. | daniel@altchain.app`,
      html: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
  <div style="display: flex; align-items: center; margin-bottom: 24px;">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
      <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
  </div>

  <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
    欢迎加入AltChain等候名单！
  </h2>
  
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    感谢您加入AltChain等候名单！
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    我们很高兴在准备推出我们的AI驱动的全球采购平台时，有您的加入。您将成为我们启动时最先知道的人之一。
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://altchain.app" target="_blank" style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
      访问 AltChain
    </a>
    <p style="margin-top: 10px; font-size: 12px;">
      如果按钮不起作用，请将此URL复制并粘贴到您的浏览器中：<br>
      <a href="https://altchain.app" style="color: #4F46E5;"><strong>https://altchain.app</strong></a>
    </p>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center; margin-top: 24px;">
    您收到此邮件是因为您在altchain.app上注册<br>
    AltChain, Inc. | <a href="mailto:daniel@altchain.app" style="color: #999;">daniel@altchain.app</a>
  </p>
</div>`
    },
    ru: {
      subject: 'Добро пожаловать в список ожидания AltChain',
      text: `Спасибо за присоединение к списку ожидания AltChain!\n\nМы рады приветствовать вас на борту, пока мы готовимся к запуску нашей платформы глобальных поставок с искусственным интеллектом. Вы будете одним из первых, кто узнает о нашем запуске.\n\nПосетите нас: https://altchain.app\n\nКоманда AltChain`,
      html: `<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
  <div style="display: flex; align-items: center; margin-bottom: 24px;">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
      <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
  </div>

  <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
    Добро пожаловать в список ожидания AltChain!
  </h2>
  
  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Спасибо за присоединение к списку ожидания AltChain!
  </p>

  <p style="font-size: 16px; color: #333; line-height: 1.6;">
    Мы рады приветствовать вас на борту, пока мы готовимся к запуску нашей платформы глобальных поставок с искусственным интеллектом. Вы будете одним из первых, кто узнает о нашем запуске.
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://altchain.app" target="_blank" style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
      Посетить AltChain
    </a>
    <p style="margin-top: 10px; font-size: 12px;">
      Если кнопка не работает, скопируйте и вставьте этот URL в ваш браузер: <br>
      <a href="https://altchain.app" style="color: #4F46E5;"><strong>https://altchain.app</strong></a>
    </p>
  </div>

  <p style="font-size: 12px; color: #999; text-align: center; margin-top: 24px;">
    Вы получили это письмо, потому что зарегистрировались на altchain.app<br>
    AltChain, Inc. | <a href="mailto:daniel@altchain.app" style="color: #999;">daniel@altchain.app</a>
  </p>
</div>`
    }
  };

  // Use the specified language template or fall back to English
  const template = templates[language] || templates.en;
  
  // Personalize subject and content if name is provided
  let subject = template.subject;
  let text = template.text;
  let html = template.html;
  
  // Add personalization with name if provided
  if (name) {
    // For email subject - only English for now
    if (language === 'en') {
      subject = `Welcome to AltChain, ${name}!`;
    }
    
    // Insert name in the HTML content for all languages
    html = html.replace('<h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">', 
      `<h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
      ${language === 'en' ? `Hi ${name}, ` : ''}`)
  }

  return sendEmail({
    to: email,
    subject: subject,
    text: text,
    html: html
  });
}