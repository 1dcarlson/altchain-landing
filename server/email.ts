import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  const msg = {
    to,
    from: 'daniel@altchain.app', // 👈 must match your verified sender
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    throw new Error('Email failed to send');
  }
}

/**
 * Send a waitlist confirmation email
 * @param {string} email Recipient email address
 * @param {string} language Language code for localization (en, es, fr, zh, ru)
 * @returns {Promise<void>}
 */
export async function sendWaitlistConfirmation(email, language = 'en') {
  // Define email templates for different languages
  const templates = {
    en: {
      subject: 'Welcome to AltChain Waitlist',
      text: `Thank you for joining the AltChain waitlist!\n\nWe're excited to have you on board as we prepare to launch our AI-powered global sourcing platform. You'll be among the first to know when we launch.\n\nThe AltChain Team`,
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
            In the meantime, if you have any questions, feel free to reply to this email.
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Best regards,<br>
            <strong>The AltChain Team</strong>
          </p>
        </div>`

    },
    es: {
      subject: 'Bienvenido a la Lista de Espera de AltChain',
      text: `¡Gracias por unirse a la lista de espera de AltChain!\n\nEstamos emocionados de tenerlo a bordo mientras nos preparamos para lanzar nuestra plataforma de abastecimiento global impulsada por IA. Será de los primeros en saber cuando lancemos.\n\nEl Equipo de AltChain`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">¡Bienvenido a la Lista de Espera de AltChain!</h2>
        <p>¡Gracias por unirse a la lista de espera de AltChain!</p>
        <p>Estamos emocionados de tenerlo a bordo mientras nos preparamos para lanzar nuestra plataforma de abastecimiento global impulsada por IA. Será de los primeros en saber cuando lancemos.</p>
        <p>Saludos cordiales,<br>El Equipo de AltChain</p>
      </div>`
    },
    fr: {
      subject: 'Bienvenue sur la Liste d\'Attente AltChain',
      text: `Merci d'avoir rejoint la liste d'attente AltChain!\n\nNous sommes ravis de vous avoir à bord alors que nous nous préparons à lancer notre plateforme d'approvisionnement mondial alimentée par l'IA. Vous serez parmi les premiers à être informés de notre lancement.\n\nL'équipe AltChain`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Bienvenue sur la Liste d'Attente AltChain!</h2>
        <p>Merci d'avoir rejoint la liste d'attente AltChain!</p>
        <p>Nous sommes ravis de vous avoir à bord alors que nous nous préparons à lancer notre plateforme d'approvisionnement mondial alimentée par l'IA. Vous serez parmi les premiers à être informés de notre lancement.</p>
        <p>Cordialement,<br>L'équipe AltChain</p>
      </div>`
    },
    zh: {
      subject: '欢迎加入AltChain等候名单',
      text: `感谢您加入AltChain等候名单！\n\n我们很高兴在准备推出我们的AI驱动的全球采购平台时，有您的加入。您将成为我们启动时最先知道的人之一。\n\nAltChain团队`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">欢迎加入AltChain等候名单！</h2>
        <p>感谢您加入AltChain等候名单！</p>
        <p>我们很高兴在准备推出我们的AI驱动的全球采购平台时，有您的加入。您将成为我们启动时最先知道的人之一。</p>
        <p>此致,<br>AltChain团队</p>
      </div>`
    },
    ru: {
      subject: 'Добро пожаловать в список ожидания AltChain',
      text: `Спасибо за присоединение к списку ожидания AltChain!\n\nМы рады приветствовать вас на борту, пока мы готовимся к запуску нашей платформы глобальных поставок с искусственным интеллектом. Вы будете одним из первых, кто узнает о нашем запуске.\n\nКоманда AltChain`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Добро пожаловать в список ожидания AltChain!</h2>
        <p>Спасибо за присоединение к списку ожидания AltChain!</p>
        <p>Мы рады приветствовать вас на борту, пока мы готовимся к запуску нашей платформы глобальных поставок с искусственным интеллектом. Вы будете одним из первых, кто узнает о нашем запуске.</p>
        <p>С уважением,<br>Команда AltChain</p>
      </div>`
    }
  };

  // Use the specified language template or fall back to English
  const template = templates[language] || templates.en;

  return sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html
  });
}