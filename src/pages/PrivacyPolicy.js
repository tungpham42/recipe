import React from "react";
import { useLanguage } from "../context/LanguageContext";

const privacyPolicyTranslations = {
  en: `
      <div>
        <h1>Privacy Policy</h1>
        <p>Last updated: March 25, 2025</p>
        <h2>Introduction</h2>
        <p>Welcome to the Recipe Sharing Platform ("we," "us," or "our"). We are committed to protecting your privacy and ensuring that your personal information is handled responsibly. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> When you register or log in (including via Google), we may collect your email address, name, and other details you provide.</li>
          <li><strong>Recipe Data:</strong> Information you submit when adding or editing recipes, such as titles, descriptions, ingredients, steps, categories, and optional images.</li>
          <li><strong>Comments:</strong> Any comments you post on recipes.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our platform, such as pages visited, search queries, and IP address.</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services, such as displaying your recipes and comments.</li>
          <li>Manage your account and authenticate your login.</li>
          <li>Communicate with you, including responding to inquiries or sending updates.</li>
          <li>Analyze usage trends to enhance user experience.</li>
        </ul>
        <h2>Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share it with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third parties that assist with hosting, analytics, or authentication (e.g., Google for login).</li>
          <li><strong>Legal Requirements:</strong> If required by law or to protect our rights.</li>
        </ul>
        <h2>Cookies and Tracking</h2>
        <p>We use cookies to store your language preference and improve your experience. You can disable cookies in your browser settings, but this may affect functionality.</p>
        <h2>Your Choices</h2>
        <p>You can:</p>
        <ul>
          <li>Update or delete your recipes and comments.</li>
          <li>Change your language settings.</li>
          <li>Delete your account by contacting us.</li>
        </ul>
        <h2>Data Security</h2>
        <p>We implement reasonable measures to protect your information, but no system is completely secure. Please use strong passwords and keep your account details confidential.</p>
        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  vi: `
      <div>
        <h1>Chính sách Bảo mật</h1>
        <p>Cập nhật lần cuối: Ngày 25 tháng 3 năm 2025</p>
        <h2>Giới thiệu</h2>
        <p>Chào mừng bạn đến với Nền tảng Chia sẻ Công thức ("chúng tôi"). Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và đảm bảo rằng thông tin cá nhân của bạn được xử lý một cách có trách nhiệm. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn sử dụng trang web và dịch vụ của chúng tôi.</p>
        <h2>Thông tin Chúng tôi Thu thập</h2>
        <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
        <ul>
          <li><strong>Thông tin Cá nhân:</strong> Khi bạn đăng ký hoặc đăng nhập (bao gồm qua Google), chúng tôi có thể thu thập địa chỉ email, tên và các chi tiết khác mà bạn cung cấp.</li>
          <li><strong>Dữ liệu Công thức:</strong> Thông tin bạn gửi khi thêm hoặc chỉnh sửa công thức, chẳng hạn như tiêu đề, mô tả, nguyên liệu, các bước, danh mục và hình ảnh tùy chọn.</li>
          <li><strong>Bình luận:</strong> Bất kỳ bình luận nào bạn đăng trên các công thức.</li>
          <li><strong>Dữ liệu Sử dụng:</strong> Thông tin về cách bạn tương tác với nền tảng của chúng tôi, như các trang đã truy cập, truy vấn tìm kiếm và địa chỉ IP.</li>
        </ul>
        <h2>Cách Chúng tôi Sử dụng Thông tin của Bạn</h2>
        <p>Chúng tôi sử dụng thông tin của bạn để:</p>
        <ul>
          <li>Cung cấp và cải thiện dịch vụ của chúng tôi, chẳng hạn như hiển thị công thức và bình luận của bạn.</li>
          <li>Quản lý tài khoản của bạn và xác thực đăng nhập.</li>
          <li>Liên lạc với bạn, bao gồm trả lời các câu hỏi hoặc gửi cập nhật.</li>
          <li>Phân tích xu hướng sử dụng để nâng cao trải nghiệm người dùng.</li>
        </ul>
        <h2>Chia sẻ Thông tin của Bạn</h2>
        <p>Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi có thể chia sẻ nó với:</p>
        <ul>
          <li><strong>Nhà cung cấp Dịch vụ:</strong> Các bên thứ ba hỗ trợ lưu trữ, phân tích hoặc xác thực (ví dụ: Google cho đăng nhập).</li>
          <li><strong>Yêu cầu Pháp lý:</strong> Nếu pháp luật yêu cầu hoặc để bảo vệ quyền lợi của chúng tôi.</li>
        </ul>
        <h2>Cookies và Theo dõi</h2>
        <p>Chúng tôi sử dụng cookies để lưu trữ tùy chọn ngôn ngữ của bạn và cải thiện trải nghiệm. Bạn có thể tắt cookies trong cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng đến chức năng.</p>
        <h2>Lựa chọn của Bạn</h2>
        <p>Bạn có thể:</p>
        <ul>
          <li>Cập nhật hoặc xóa công thức và bình luận của bạn.</li>
          <li>Thay đổi cài đặt ngôn ngữ.</li>
          <li>Xóa tài khoản của bạn bằng cách liên hệ với chúng tôi.</li>
        </ul>
        <h2>Bảo mật Dữ liệu</h2>
        <p>Chúng tôi thực hiện các biện pháp hợp lý để bảo vệ thông tin của bạn, nhưng không hệ thống nào hoàn toàn an toàn. Vui lòng sử dụng mật khẩu mạnh và giữ bí mật thông tin tài khoản.</p>
        <h2>Liên hệ với Chúng tôi</h2>
        <p>Nếu bạn có thắc mắc về Chính sách Bảo mật này, liên hệ với chúng tôi tại: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  fr: `
      <div>
        <h1>Politique de Confidentialité</h1>
        <p>Dernière mise à jour : 25 mars 2025</p>
        <h2>Introduction</h2>
        <p>Bienvenue sur la Plateforme de Partage de Recettes ("nous"). Nous nous engageons à protéger votre vie privée et à garantir que vos informations personnelles soient traitées de manière responsable. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre site web et nos services.</p>
        <h2>Informations que Nous Collectons</h2>
        <p>Nous pouvons collecter les types d'informations suivants :</p>
        <ul>
          <li><strong>Informations Personnelles :</strong> Lors de votre inscription ou connexion (y compris via Google), nous pouvons collecter votre adresse email, votre nom et d'autres détails que vous fournissez.</li>
          <li><strong>Données de Recettes :</strong> Informations que vous soumettez en ajoutant ou modifiant des recettes, telles que les titres, descriptions, ingrédients, étapes, catégories et images facultatives.</li>
          <li><strong>Commentaires :</strong> Tous les commentaires que vous publiez sur les recettes.</li>
          <li><strong>Données d'Utilisation :</strong> Informations sur la manière dont vous interagissez avec notre plateforme, comme les pages visitées, les requêtes de recherche et l'adresse IP.</li>
        </ul>
        <h2>Comment Nous Utilisons Vos Informations</h2>
        <p>Nous utilisons vos informations pour :</p>
        <ul>
          <li>Fournir et améliorer nos services, comme afficher vos recettes et commentaires.</li>
          <li>Gérer votre compte et authentifier votre connexion.</li>
          <li>Communiquer avec vous, y compris répondre à vos questions ou envoyer des mises à jour.</li>
          <li>Analyser les tendances d'utilisation pour améliorer l'expérience utilisateur.</li>
        </ul>
        <h2>Partage de Vos Informations</h2>
        <p>Nous ne vendons pas vos informations personnelles. Nous pouvons les partager avec :</p>
        <ul>
          <li><strong>Fournisseurs de Services :</strong> Tiers qui aident à l'hébergement, l'analyse ou l'authentification (par exemple, Google pour la connexion).</li>
          <li><strong>Exigences Légales :</strong> Si la loi l'exige ou pour protéger nos droits.</li>
        </ul>
        <h2>Cookies et Suivi</h2>
        <p>Nous utilisons des cookies pour stocker vos préférences linguistiques et améliorer votre expérience. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter les fonctionnalités.</p>
        <h2>Vos Choix</h2>
        <p>Vous pouvez :</p>
        <ul>
          <li>Mettre à jour ou supprimer vos recettes et commentaires.</li>
          <li>Modifier vos paramètres de langue.</li>
          <li>Supprimer votre compte en nous contactant.</li>
        </ul>
        <h2>Sécurité des Données</h2>
        <p>Nous mettons en œuvre des mesures raisonnables pour protéger vos informations, mais aucun système n'est totalement sécurisé. Veuillez utiliser des mots de passe forts et garder vos informations de compte confidentielles.</p>
        <h2>Contactez-Nous</h2>
        <p>Si vous avez des questions sur cette Politique de Confidentialité, contactez-nous à : <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  es: `
      <div>
        <h1>Política de Privacidad</h1>
        <p>Última actualización: 25 de marzo de 2025</p>
        <h2>Introducción</h2>
        <p>Bienvenido a la Plataforma de Recetas ("nosotros"). Nos comprometemos a proteger tu privacidad y asegurar que tu información personal sea manejada de manera responsable. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando utilizas nuestro sitio web y servicios.</p>
        <h2>Información que Recopilamos</h2>
        <p>Podemos recopilar los siguientes tipos de información:</p>
        <ul>
          <li><strong>Información Personal:</strong> Cuando te registras o inicias sesión (incluso a través de Google), podemos recoger tu dirección de correo electrónico, nombre y otros detalles que proporciones.</li>
          <li><strong>Datos de Recetas:</strong> Información que envías al agregar o editar recetas, como títulos, descripciones, ingredientes, pasos, categorías e imágenes opcionales.</li>
          <li><strong>Comentarios:</strong> Cualquier comentario que publiques sobre recetas.</li>
          <li><strong>Datos de Uso:</strong> Información sobre cómo interactúas con nuestra plataforma, como páginas visitadas, consultas de búsqueda y dirección IP.</li>
        </ul>
        <h2>Cómo Usamos Tu Información</h2>
        <p>Usamos tu información para:</p>
        <ul>
          <li>Proporcionar y mejorar nuestros servicios, como mostrar tus recetas y comentarios.</li>
          <li>Gestionar tu cuenta y autenticar tu inicio de sesión.</li>
          <li>Comunicarnos contigo, incluyendo responder a consultas o enviar actualizaciones.</li>
          <li>Analizar tendencias de uso para mejorar la experiencia del usuario.</li>
        </ul>
        <h2>Compartir Tu Información</h2>
        <p>No vendemos tu información personal. Podemos compartirla con:</p>
        <ul>
          <li><strong>Proveedores de Servicios:</strong> Terceros que ayudan con el alojamiento, análisis o autenticación (por ejemplo, Google para el inicio de sesión).</li>
          <li><strong>Requisitos Legales:</strong> Si la ley lo exige o para proteger nuestros derechos.</li>
        </ul>
        <h2>Cookies y Seguimiento</h2>
        <p>Usamos cookies para almacenar tus preferencias de idioma y mejorar tu experiencia. Puedes desactivar las cookies en la configuración de tu navegador, pero esto puede afectar la funcionalidad.</p>
        <h2>Tus Opciones</h2>
        <p>Puedes:</p>
        <ul>
          <li>Actualizar o eliminar tus recetas y comentarios.</li>
          <li>Cambiar la configuración de idioma.</li>
          <li>Eliminar tu cuenta contactándonos.</li>
        </ul>
        <h2>Seguridad de Datos</h2>
        <p>Implementamos medidas razonables para proteger tu información, pero ningún sistema es completamente seguro. Usa contraseñas fuertes y mantén confidenciales los detalles de tu cuenta.</p>
        <h2>Contáctanos</h2>
        <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  pt: `
      <div>
        <h1>Política de Privacidade</h1>
        <p>Última atualização: 25 de março de 2025</p>
        <h2>Introdução</h2>
        <p>Bem-vindo à Plataforma de Receitas ("nós"). Estamos comprometidos em proteger sua privacidade e garantir que suas informações pessoais sejam tratadas de forma responsável. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações ao usar nosso site e serviços.</p>
        <h2>Informações que Coletamos</h2>
        <p>Podemos coletar os seguintes tipos de informações:</p>
        <ul>
          <li><strong>Informações Pessoais:</strong> Ao se registrar ou fazer login (inclusive via Google), podemos coletar seu endereço de e-mail, nome e outros detalhes que você fornecer.</li>
          <li><strong>Dados de Receitas:</strong> Informações que você envia ao adicionar ou editar receitas, como títulos, descrições, ingredientes, passos, categorias e imagens opcionais.</li>
          <li><strong>Comentários:</strong> Quaisquer comentários que você publique sobre receitas.</li>
          <li><strong>Dados de Uso:</strong> Informações sobre como você interage com nossa plataforma, como páginas visitadas, consultas de pesquisa e endereço IP.</li>
        </ul>
        <h2>Como Usamos Suas Informações</h2>
        <p>Usamos suas informações para:</p>
        <ul>
          <li>Fornecer e melhorar nossos serviços, como exibir suas receitas e comentários.</li>
          <li>Gerenciar sua conta e autenticar seu login.</li>
          <li>Comunicar-nos com você, incluindo responder a perguntas ou enviar atualizações.</li>
          <li>Analisar tendências de uso para aprimorar a experiência do usuário.</li>
        </ul>
        <h2>Compartilhamento de Suas Informações</h2>
        <p>Não vendemos suas informações pessoais. Podemos compartilhá-las com:</p>
        <ul>
          <li><strong>Provedores de Serviços:</strong> Terceiros que auxiliam no hospedagem, análise ou autenticação (por exemplo, Google para login).</li>
          <li><strong>Requisitos Legais:</strong> Se exigido por lei ou para proteger nossos direitos.</li>
        </ul>
        <h2>Cookies e Rastreamento</h2>
        <p>Usamos cookies para armazenar sua preferência de idioma e melhorar sua experiência. Você pode desativar os cookies nas configurações do navegador, mas isso pode afetar a funcionalidade.</p>
        <h2>Suas Escolhas</h2>
        <p>Você pode:</p>
        <ul>
          <li>Atualizar ou excluir suas receitas e comentários.</li>
          <li>Alterar as configurações de idioma.</li>
          <li>Excluir sua conta entrando em contato conosco.</li>
        </ul>
        <h2>Segurança de Dados</h2>
        <p>Implementamos medidas razoáveis para proteger suas informações, mas nenhum sistema é completamente seguro. Use senhas fortes e mantenha os detalhes da sua conta confidenciais.</p>
        <h2>Contate-Nos</h2>
        <p>Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  de: `
      <div>
        <h1>Datenschutzrichtlinie</h1>
        <p>Zuletzt aktualisiert: 25. März 2025</p>
        <h2>Einführung</h2>
        <p>Willkommen auf der Rezeptplattform ("wir"). Wir verpflichten uns, Ihre Privatsphäre zu schützen und sicherzustellen, dass Ihre persönlichen Daten verantwortungsvoll behandelt werden. Diese Datenschutzrichtlinie erläutert, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unsere Website und Dienste nutzen.</p>
        <h2>Informationen, die Wir Sammeln</h2>
        <p>Wir können folgende Arten von Informationen sammeln:</p>
        <ul>
          <li><strong>Persönliche Informationen:</strong> Wenn Sie sich registrieren oder anmelden (auch über Google), können wir Ihre E-Mail-Adresse, Ihren Namen und andere von Ihnen angegebene Details erfassen.</li>
          <li><strong>Rezeptdaten:</strong> Informationen, die Sie beim Hinzufügen oder Bearbeiten von Rezepten einreichen, wie Titel, Beschreibungen, Zutaten, Schritte, Kategorien und optionale Bilder.</li>
          <li><strong>Kommentare:</strong> Alle Kommentare, die Sie zu Rezepten veröffentlichen.</li>
          <li><strong>Nutzungsdaten:</strong> Informationen darüber, wie Sie mit unserer Plattform interagieren, wie besuchte Seiten, Suchanfragen und IP-Adresse.</li>
        </ul>
        <h2>Wie Wir Ihre Informationen Verwenden</h2>
        <p>Wir verwenden Ihre Informationen, um:</p>
        <ul>
          <li>Unsere Dienste bereitzustellen und zu verbessern, wie das Anzeigen Ihrer Rezepte und Kommentare.</li>
          <li>Ihr Konto zu verwalten und Ihre Anmeldung zu authentifizieren.</li>
          <li>Mit Ihnen zu kommunizieren, einschließlich der Beantwortung von Anfragen oder dem Senden von Updates.</li>
          <li>Nutzungstrends zu analysieren, um die Benutzererfahrung zu verbessern.</li>
        </ul>
        <h2>Weitergabe Ihrer Informationen</h2>
        <p>Wir verkaufen Ihre persönlichen Informationen nicht. Wir können sie teilen mit:</p>
        <ul>
          <li><strong>Dienstleistern:</strong> Dritten, die bei Hosting, Analyse oder Authentifizierung helfen (z. B. Google für die Anmeldung).</li>
          <li><strong>Gesetzlichen Anforderungen:</strong> Wenn dies gesetzlich vorgeschrieben ist oder um unsere Rechte zu schützen.</li>
        </ul>
        <h2>Cookies und Tracking</h2>
        <p>Wir verwenden Cookies, um Ihre Sprachpräferenz zu speichern und Ihre Erfahrung zu verbessern. Sie können Cookies in Ihren Browsereinstellungen deaktivieren, aber dies kann die Funktionalität beeinträchtigen.</p>
        <h2>Ihre Wahlmöglichkeiten</h2>
        <p>Sie können:</p>
        <ul>
          <li>Ihre Rezepte und Kommentare aktualisieren oder löschen.</li>
          <li>Ihre Spracheinstellungen ändern.</li>
          <li>Ihr Konto löschen, indem Sie uns kontaktieren.</li>
        </ul>
        <h2>Datensicherheit</h2>
        <p>Wir setzen angemessene Maßnahmen ein, um Ihre Informationen zu schützen, aber kein System ist völlig sicher. Bitte verwenden Sie starke Passwörter und halten Sie Ihre Kontodaten vertraulich.</p>
        <h2>Kontaktieren Sie Uns</h2>
        <p>Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns unter: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  it: `
      <div>
        <h1>Politica sulla Privacy</h1>
        <p>Ultimo aggiornamento: 25 marzo 2025</p>
        <h2>Introduzione</h2>
        <p>Benvenuto sulla Piattaforma di Condivisione Ricette ("noi"). Ci impegniamo a proteggere la tua privacy e a garantire che le tue informazioni personali siano gestite responsabilmente. Questa Politica sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni quando utilizzi il nostro sito web e i nostri servizi.</p>
        <h2>Informazioni che Raccogliamo</h2>
        <p>Possiamo raccogliere i seguenti tipi di informazioni:</p>
        <ul>
          <li><strong>Informazioni Personali:</strong> Quando ti registri o accedi (anche tramite Google), possiamo raccogliere il tuo indirizzo email, nome e altri dettagli che fornisci.</li>
          <li><strong>Dati delle Ricette:</strong> Informazioni che invii quando aggiungi o modifichi ricette, come titoli, descrizioni, ingredienti, passaggi, categorie e immagini opzionali.</li>
          <li><strong>Commenti:</strong> Qualsiasi commento che pubblichi sulle ricette.</li>
          <li><strong>Dati di Utilizzo:</strong> Informazioni su come interagisci con la nostra piattaforma, come le pagine visitate, le query di ricerca e l'indirizzo IP.</li>
        </ul>
        <h2>Come Utilizziamo le Tue Informazioni</h2>
        <p>Utilizziamo le tue informazioni per:</p>
        <ul>
          <li>Fornire e migliorare i nostri servizi, come mostrare le tue ricette e commenti.</li>
          <li>Gestire il tuo account e autenticare il tuo accesso.</li>
          <li>Comunicare con te, incluso rispondere alle richieste o inviare aggiornamenti.</li>
          <li>Analizzare le tendenze di utilizzo per migliorare l'esperienza utente.</li>
        </ul>
        <h2>Condivisione delle Tue Informazioni</h2>
        <p>Non vendiamo le tue informazioni personali. Possiamo condividerle con:</p>
        <ul>
          <li><strong>Fornitori di Servizi:</strong> Terze parti che assistono con hosting, analisi o autenticazione (ad esempio, Google per l'accesso).</li>
          <li><strong>Requisiti Legali:</strong> Se richiesto dalla legge o per proteggere i nostri diritti.</li>
        </ul>
        <h2>Cookie e Tracciamento</h2>
        <p>Usiamo i cookie per memorizzare la tua preferenza linguistica e migliorare la tua esperienza. Puoi disabilitare i cookie nelle impostazioni del browser, ma ciò potrebbe influire sulla funzionalità.</p>
        <h2>Le Tue Scelte</h2>
        <p>Puoi:</p>
        <ul>
          <li>Aggiornare o eliminare le tue ricette e commenti.</li>
          <li>Modificare le impostazioni della lingua.</li>
          <li>Eliminare il tuo account contattandoci.</li>
        </ul>
        <h2>Sicurezza dei Dati</h2>
        <p>Adottiamo misure ragionevoli per proteggere le tue informazioni, ma nessun sistema è completamente sicuro. Usa password forti e mantieni riservati i dettagli del tuo account.</p>
        <h2>Contattaci</h2>
        <p>Se hai domande su questa Politica sulla Privacy, contattaci a: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  ru: `
      <div>
        <h1>Политика Конфиденциальности</h1>
        <p>Последнее обновление: 25 марта 2025 года</p>
        <h2>Введение</h2>
        <p>Добро пожаловать на Платформу Обмена Рецептами ("мы"). Мы стремимся защищать вашу конфиденциальность и гарантировать ответственное обращение с вашей личной информацией. Эта Политика Конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании нашего сайта и услуг.</p>
        <h2>Информация, которую Мы Собираем</h2>
        <p>Мы можем собирать следующие типы информации:</p>
        <ul>
          <li><strong>Личная Информация:</strong> При регистрации или входе (включая через Google) мы можем собирать ваш адрес электронной почты, имя и другие предоставленные вами данные.</li>
          <li><strong>Данные Рецептов:</strong> Информация, которую вы отправляете при добавлении или редактировании рецептов, такая как названия, описания, ингредиенты, шаги, категории и необязательные изображения.</li>
          <li><strong>Комментарии:</strong> Любые комментарии, которые вы публикуете к рецептам.</li>
          <li><strong>Данные Использования:</strong> Информация о том, как вы взаимодействуете с нашей платформой, например, посещенные страницы, поисковые запросы и IP-адрес.</li>
        </ul>
        <h2>Как Мы Используем Вашу Информацию</h2>
        <+Qp>Мы используем вашу информацию для:</p>
        <ul>
          <li>Предоставления и улучшения наших услуг, таких как отображение ваших рецептов и комментариев.</li>
          <li>Управления вашей учетной записью и аутентификации входа.</li>
          <li>Общения с вами, включая ответы на запросы или отправку обновлений.</li>
          <li>Анализа тенденций использования для улучшения пользовательского опыта.</li>
        </ul>
        <h2>Передача Вашей Информации</h2>
        <p>Мы не продаем вашу личную информацию. Мы можем делиться ею с:</p>
        <ul>
          <li><strong>Поставщиками Услуг:</strong> Третьими сторонами, которые помогают с хостингом, аналитикой или аутентификацией (например, Google для входа).</li>
          <li><strong>Юридическими Требованиями:</strong> Если это требуется по закону или для защиты наших прав.</li>
        </ul>
        <h2>Cookies и Отслеживание</h2>
        <p>Мы используем cookies для хранения ваших языковых предпочтений и улучшения вашего опыта. Вы можете отключить cookies в настройках браузера, но это может повлиять на функциональность.</p>
        <h2>Ваши Возможности</h2>
        <p>Вы можете:</p>
        <ul>
          <li>Обновлять или удалять свои рецепты и комментарии.</li>
          <li>Изменять настройки языка.</li>
          <li>Удалить свою учетную запись, связавшись с нами.</li>
        </ul>
        <h2>Безопасность Данных</h2>
        <p>Мы принимаем разумные меры для защиты вашей информации, но ни одна система не является полностью безопасной. Используйте надежные пароли и сохраняйте конфиденциальность данных вашей учетной записи.</p>
        <h2>Свяжитесь с Нами</h2>
        <p>Если у вас есть вопросы по этой Политике Конфиденциальности, свяжитесь с нами по адресу: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  ja: `
      <div>
        <h1>プライバシーポリシー</h1>
        <p>最終更新日：2025年3月25日</p>
        <h2>はじめに</h2>
        <p>レシピ共有プラットフォーム（「私たち」）へようこそ。私たちはあなたのプライバシーを保護し、個人情報が責任を持って扱われることを保証することに取り組んでいます。このプライバシーポリシーは、私たちのウェブサイトおよびサービスを利用する際に、あなたの情報をどのように収集、使用、開示、保護するかを説明します。</p>
        <h2>収集する情報</h2>
        <p>以下の種類の情報を収集する場合があります：</p>
        <ul>
          <li><strong>個人情報：</strong> 登録またはログイン（Google経由を含む）時に、あなたのメールアドレス、名前、その他あなたが提供する詳細を収集することがあります。</li>
          <li><strong>レシピデータ：</strong> レシピの追加や編集時に送信する情報（タイトル、説明、材料、手順、カテゴリ、オプションの画像など）。</li>
          <li><strong>コメント：</strong> レシピに投稿するコメント。</li>
          <li><strong>利用データ：</strong> プラットフォームとのやり取りに関する情報（訪問したページ、検索クエリ、IPアドレスなど）。</li>
        </ul>
        <h2>情報の使用方法</h2>
        <p>私たちはあなたの情報を以下のために使用します：</p>
        <ul>
          <li>サービスの提供と改善（レシピやコメントの表示など）。</li>
          <li>アカウントの管理とログインの認証。</li>
          <li>あなたとのコミュニケーション（問い合わせへの回答や更新の送信を含む）。</li>
          <li>利用傾向の分析によるユーザー体験の向上。</li>
        </ul>
        <h2>情報の共有</h2>
        <p>私たちはあなたの個人情報を販売しません。以下の者と共有する場合があります：</p>
        <ul>
          <li><strong>サービスプロバイダ：</strong> ホスティング、分析、認証を支援する第三者（例：ログインのためのGoogle）。</li>
          <li><strong>法的要件：</strong> 法律で要求された場合、または私たちの権利を保護するため。</li>
        </ul>
        <h2>クッキーとトラッキング</h2>
        <p>クッキーを使用して言語設定を保存し、体験を向上させます。ブラウザ設定でクッキーを無効にできますが、機能に影響を与える可能性があります。</p>
        <h2>あなたの選択肢</h2>
        <p>あなたは以下ができます：</p>
        <ul>
          <li>レシピやコメントを更新または削除する。</li>
          <li>言語設定を変更する。</li>
          <li>私たちに連絡してアカウントを削除する。</li>
        </ul>
        <h2>データセキュリティ</h2>
        <p>私たちはあなたの情報を保護するために合理的な措置を講じますが、完全に安全なシステムはありません。強力なパスワードを使用し、アカウントの詳細を秘密にしてください。</p>
        <h2>お問い合わせ</h2>
        <p>このプライバシーポリシーに関するご質問は、以下までご連絡ください：<a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>。</p>
      </div>
    `,
  ko: `
      <div>
        <h1>개인정보 보호정책</h1>
        <p>최종 업데이트: 2025년 3월 25일</p>
        <h2>소개</h2>
        <p>레시피 공유 플랫폼("우리")에 오신 것을 환영합니다. 우리는 귀하의 개인정보를 보호하고 귀하의 개인정보가 책임감 있게 처리되도록 보장하기 위해 최선을 다하고 있습니다. 이 개인정보 보호정책은 귀하가 우리 웹사이트와 서비스를 사용할 때 귀하의 정보를 어떻게 수집, 사용, 공개, 보호하는지 설명합니다.</p>
        <h2>수집하는 정보</h2>
        <p>우리는 다음과 같은 유형의 정보를 수집할 수 있습니다:</p>
        <ul>
          <li><strong>개인정보:</strong> 귀하가 등록하거나 로그인(Google을 통한 경우 포함)할 때, 이메일 주소, 이름, 귀하가 제공하는 기타 세부 정보를 수집할 수 있습니다.</li>
          <li><strong>레시피 데이터:</strong> 레시피를 추가하거나 편집할 때 제출하는 정보(제목, 설명, 재료, 단계, 카테고리, 선택적 이미지 등).</li>
          <li><strong>댓글:</strong> 레시피에 게시하는 모든 댓글.</li>
          <li><strong>사용 데이터:</strong> 플랫폼과 상호작용하는 방식에 대한 정보(방문한 페이지, 검색 쿼리, IP 주소 등).</li>
        </ul>
        <h2>정보 사용 방법</h2>
        <p>우리는 귀하의 정보를 다음과 같은 목적으로 사용합니다:</p>
        <ul>
          <li>서비스 제공 및 개선(레시피와 댓글 표시 등).</li>
          <li>계정 관리 및 로그인 인증.</li>
          <li>귀하와의 소통(문의 응답 또는 업데이트 전송 포함).</li>
          <li>사용 트렌드 분석을 통한 사용자 경험 향상.</li>
        </ul>
        <h2>정보 공유</h2>
        <p>우리는 귀하의 개인정보를 판매하지 않습니다. 다음 대상과 공유할 수 있습니다:</p>
        <ul>
          <li><strong>서비스 제공업체:</strong> 호스팅, 분석, 인증을 지원하는 제3자(예: 로그인용 Google).</li>
          <li><strong>법적 요구:</strong> 법률에 의해 요구되거나 우리의 권리를 보호하기 위해.</li>
        </ul>
        <h2>쿠키 및 추적</h2>
        <p>쿠키를 사용하여 언어 설정을 저장하고 경험을 개선합니다. 브라우저 설정에서 쿠키를 비활성화할 수 있지만 기능에 영향을 줄 수 있습니다.</p>
        <h2>귀하의 선택</h2>
        <p>귀하는 다음을 할 수 있습니다:</p>
        <ul>
          <li>레시피와 댓글을 업데이트하거나 삭제하기.</li>
          <li>언어 설정 변경하기.</li>
          <li>저희에게 연락하여 계정 삭제하기.</li>
        </ul>
        <h2>데이터 보안</h2>
        <p>우리는 귀하의 정보를 보호하기 위해 합리적인 조치를 취하지만, 어떤 시스템도 완전히 안전하지 않습니다. 강력한 비밀번호를 사용하고 계정 세부 정보를 기밀로 유지하세요.</p>
        <h2>문의하기</h2>
        <p>이 개인정보 보호정책에 대한 질문이 있으면 다음으로 연락 주세요: <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>.</p>
      </div>
    `,
  zh: `
      <div>
        <h1>隐私政策</h1>
        <p>最后更新：2025年3月25日</p>
        <h2>引言</h2>
        <p>欢迎来到食谱分享平台（“我们”）。我们致力于保护您的隐私，并确保您的个人信息得到负责任的处理。本隐私政策解释了当您使用我们的网站和服务时，我们如何收集、使用、披露和保护您的信息。</p>
        <h2>我们收集的信息</h2>
        <p>我们可能会收集以下类型的信息：</p>
        <ul>
          <li><strong>个人信息：</strong> 当您注册或登录（包括通过Google）时，我们可能会收集您的电子邮件地址、姓名以及您提供的其他详细信息。</li>
          <li><strong>食谱数据：</strong> 您在添加或编辑食谱时提交的信息，例如标题、描述、原料、步骤、类别和可选图片。</li>
          <li><strong>评论：</strong> 您在食谱上发布的任何评论。</li>
          <li><strong>使用数据：</strong> 关于您如何与我们的平台互动的信息，例如访问的页面、搜索查询和IP地址。</li>
        </ul>
        <h2>我们如何使用您的信息</h2>
        <p>我们使用您的信息来：</p>
        <ul>
          <li>提供和改进我们的服务，例如显示您的食谱和评论。</li>
          <li>管理您的账户并验证您的登录。</li>
          <li>与您沟通，包括回复询问或发送更新。</li>
          <li>分析使用趋势以提升用户体验。</li>
        </ul>
        <h2>分享您的信息</h2>
        <p>我们不会出售您的个人信息。我们可能会与以下对象共享：</p>
        <ul>
          <li><strong>服务提供商：</strong> 协助托管、分析或认证的第三方（例如，用于登录的Google）。</li>
          <li><strong>法律要求：</strong> 如果法律要求或为了保护我们的权利。</li>
        </ul>
        <h2>Cookies和跟踪</h2>
        <p>我们使用cookies来存储您的语言偏好并改善您的体验。您可以在浏览器设置中禁用cookies，但这可能会影响功能。</p>
        <h2>您的选择</h2>
        <p>您可以：</p>
        <ul>
          <li>更新或删除您的食谱和评论。</li>
          <li>更改语言设置。</li>
          <li>通过联系我们删除您的账户。</li>
        </ul>
        <h2>数据安全</h2>
        <p>我们采取合理措施保护您的信息，但没有系统是完全安全的。请使用强密码并保持账户信息的机密性。</p>
        <h2>联系我们</h2>
        <p>如果您对本隐私政策有任何疑问，请联系我们： <a href="mailto:tung.42@gmail.com">tung.42@gmail.com</a>。</p>
      </div>
    `,
};

const PrivacyPolicy = () => {
  const { language } = useLanguage(); // Get current language from context

  // Use the translated HTML string for the current language
  const htmlContent =
    privacyPolicyTranslations[language] || privacyPolicyTranslations["en"]; // Fallback to English

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default PrivacyPolicy;
