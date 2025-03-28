import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Card, ListGroup } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faComment,
  faEye,
  faInfoCircle,
  faPencilAlt,
  faPlus,
  faSearch,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const instructionsTranslations = {
  en: {
    "Recipe App": "Recipe Sharing Platform",
    title: "How to Use the Recipe Sharing Platform",
    lastUpdated: "Last updated: March 26, 2025",
    sections: [
      {
        heading: "Getting Started",
        content:
          "Welcome to the Recipe Sharing Platform! Whether you're a food enthusiast looking to share your culinary creations or someone searching for new recipes to try, this guide will help you navigate our features with ease.",
      },
      {
        heading: "Create an Account",
        content:
          "To start sharing your own recipes and commenting on others, you'll need an account. Here's how:",
        list: [
          "Click <strong>Register</strong> in the navigation bar.",
          "Sign up with your email and a password, or use your Google account for a quick setup.",
          "Once registered, you'll be ready to contribute to the community!",
        ],
      },
      {
        heading: "Log In",
        content: "If you already have an account, logging in is simple:",
        list: [
          "Click <strong>Login</strong> in the navigation bar.",
          "Enter your email and password, or sign in with Google.",
          "You'll be directed to the homepage where you can explore recipes.",
        ],
      },
      {
        heading: "Explore Recipes",
        content: "Discover a variety of recipes from our community:",
        list: [
          "Use the <strong>Search bar</strong> on the homepage to find recipes by name.",
          "Filter by category (e.g., Breakfast, Dinner) or sort by alphabetical order or date.",
          "Click <strong>View Recipe</strong> on any recipe card to see the full details.",
        ],
      },
      {
        heading: "Add a Recipe",
        content: "Share your favorite dishes with the world:",
        list: [
          "Click <strong>Add Recipe</strong> in the navigation bar (you must be logged in).",
          "Fill out the form with your recipe's title, description, ingredients, steps, category, and optional image and video.",
          "Click <strong>Add Recipe</strong> to publish it—your recipe will now be visible to everyone!",
        ],
      },
      {
        heading: "Manage Your Recipes",
        content: "Keep your recipe collection organized:",
        list: [
          "Go to <strong>My Recipes</strong> in the navigation bar to see all your posted recipes.",
          "Click <strong>Edit</strong> to update a recipe's details or image.",
          "Use the sorting options to organize your recipes by name or date.",
        ],
      },
      {
        heading: "Engage with the Community",
        content: "Interact with other food lovers:",
        list: [
          "On a recipe page, scroll to the <strong>Comments</strong> section.",
          "Add your thoughts or tips by typing in the comment box and clicking <strong>Post Comment</strong>.",
          "Check out <strong>Related Recipes</strong> at the bottom of each recipe page for more inspiration.",
        ],
      },
      {
        heading: "Need Help?",
        content:
          "If you have questions or run into issues, we're here to assist:",
        list: [
          "Contact us at <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> for support.",
          "Check the <strong>Privacy Policy</strong> for details on how we handle your data.",
        ],
      },
    ],
  },
  vi: {
    "Recipe App": "Nền tảng Chia sẻ Công thức",
    title: "Cách Sử dụng Nền tảng Chia sẻ Công thức",
    lastUpdated: "Cập nhật lần cuối: Ngày 26 tháng 3 năm 2025",
    sections: [
      {
        heading: "Bắt đầu",
        content:
          "Chào mừng bạn đến với Nền tảng Chia sẻ Công thức! Dù bạn là một người yêu thích ẩm thực muốn chia sẻ các sáng tạo nấu nướng của mình hay chỉ đơn giản là tìm kiếm các công thức mới để thử, hướng dẫn này sẽ giúp bạn dễ dàng khám phá các tính năng của chúng tôi.",
      },
      {
        heading: "Tạo Tài khoản",
        content:
          "Để bắt đầu chia sẻ công thức của riêng bạn và bình luận về công thức của người khác, bạn cần một tài khoản. Đây là cách thực hiện:",
        list: [
          "Nhấn vào <strong>Đăng ký</strong> trên thanh điều hướng.",
          "Đăng ký bằng email và mật khẩu của bạn, hoặc sử dụng tài khoản Google để thiết lập nhanh chóng.",
          "Sau khi đăng ký, bạn sẽ sẵn sàng tham gia vào cộng đồng!",
        ],
      },
      {
        heading: "Đăng nhập",
        content: "Nếu bạn đã có tài khoản, việc đăng nhập rất đơn giản:",
        list: [
          "Nhấn vào <strong>Đăng nhập</strong> trên thanh điều hướng.",
          "Nhập email và mật khẩu của bạn, hoặc đăng nhập bằng Google.",
          "Bạn sẽ được chuyển đến trang chủ để khám phá các công thức.",
        ],
      },
      {
        heading: "Khám phá Công thức",
        content: "Khám phá nhiều công thức đa dạng từ cộng đồng của chúng tôi:",
        list: [
          "Sử dụng <strong>Thanh tìm kiếm</strong> trên trang chủ để tìm công thức theo tên.",
          "Lọc theo danh mục (ví dụ: Bữa sáng, Bữa tối) hoặc sắp xếp theo thứ tự chữ cái hoặc ngày.",
          "Nhấn <strong>Xem Công thức</strong> trên bất kỳ thẻ công thức nào để xem chi tiết đầy đủ.",
        ],
      },
      {
        heading: "Thêm Công thức",
        content: "Chia sẻ những món ăn yêu thích của bạn với mọi người:",
        list: [
          "Nhấn vào <strong>Thêm Công thức</strong> trên thanh điều hướng (bạn phải đăng nhập).",
          "Điền vào mẫu với tiêu đề công thức, mô tả, thành phần, các bước, danh mục, hình ảnh và video tùy chọn.",
          "Nhấn <strong>Thêm Công thức</strong> để đăng tải—công thức của bạn giờ đây sẽ hiển thị cho mọi người!",
        ],
      },
      {
        heading: "Quản lý Công thức của Bạn",
        content: "Giữ bộ sưu tập công thức của bạn gọn gàng:",
        list: [
          "Vào <strong>Công thức của Tôi</strong> trên thanh điều hướng để xem tất cả công thức bạn đã đăng.",
          "Nhấn <strong>Chỉnh sửa</strong> để cập nhật chi tiết hoặc hình ảnh của công thức.",
          "Sử dụng tùy chọn sắp xếp để tổ chức công thức theo tên hoặc ngày.",
        ],
      },
      {
        heading: "Tương tác với Cộng đồng",
        content: "Giao lưu với những người yêu ẩm thực khác:",
        list: [
          "Trên trang công thức, kéo xuống phần <strong>Bình luận</strong>.",
          "Thêm ý kiến hoặc mẹo của bạn bằng cách nhập vào ô bình luận và nhấn <strong>Đăng Bình luận</strong>.",
          "Xem <strong>Công thức Liên quan</strong> ở cuối mỗi trang công thức để tìm thêm cảm hứng.",
        ],
      },
      {
        heading: "Cần Giúp đỡ?",
        content:
          "Nếu bạn có câu hỏi hoặc gặp vấn đề, chúng tôi luôn sẵn sàng hỗ trợ:",
        list: [
          "Liên hệ với chúng tôi qua <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> để được hỗ trợ.",
          "Xem <strong>Chính sách Bảo mật</strong> để biết chi tiết về cách chúng tôi xử lý dữ liệu của bạn.",
        ],
      },
    ],
  },
  fr: {
    "Recipe App": "Plateforme de Partage de Recettes",
    title: "Comment Utiliser la Plateforme de Partage de Recettes",
    lastUpdated: "Dernière mise à jour : 26 mars 2025",
    sections: [
      {
        heading: "Démarrer",
        content:
          "Bienvenue sur la Plateforme de Partage de Recettes ! Que vous soyez un passionné de cuisine souhaitant partager vos créations culinaires ou quelqu’un cherchant de nouvelles recettes à essayer, ce guide vous aidera à naviguer facilement parmi nos fonctionnalités.",
      },
      {
        heading: "Créer un Compte",
        content:
          "Pour commencer à partager vos propres recettes et commenter celles des autres, vous aurez besoin d’un compte. Voici comment faire :",
        list: [
          "Cliquez sur <strong>S’inscrire</strong> dans la barre de navigation.",
          "Inscrivez-vous avec votre email et un mot de passe, ou utilisez votre compte Google pour une configuration rapide.",
          "Une fois inscrit, vous serez prêt à contribuer à la communauté !",
        ],
      },
      {
        heading: "Se Connecter",
        content: "Si vous avez déjà un compte, la connexion est simple :",
        list: [
          "Cliquez sur <strong>Se Connecter</strong> dans la barre de navigation.",
          "Entrez votre email et mot de passe, ou connectez-vous avec Google.",
          "Vous serez redirigé vers la page d’accueil où vous pourrez explorer les recettes.",
        ],
      },
      {
        heading: "Explorer les Recettes",
        content: "Découvrez une variété de recettes de notre communauté :",
        list: [
          "Utilisez la <strong>Barre de recherche</strong> sur la page d’accueil pour trouver des recettes par nom.",
          "Filtrez par catégorie (par exemple, Petit-déjeuner, Dîner) ou triez par ordre alphabétique ou par date.",
          "Cliquez sur <strong>Voir la Recette</strong> sur une carte de recette pour voir tous les détails.",
        ],
      },
      {
        heading: "Ajouter une Recette",
        content: "Partagez vos plats préférés avec le monde entier :",
        list: [
          "Cliquez sur <strong>Ajouter une Recette</strong> dans la barre de navigation (vous devez être connecté).",
          "Remplissez le formulaire avec le titre, la description, les ingrédients, les étapes, la catégorie et une image facultative de votre recette.",
          "Cliquez sur <strong>Ajouter une Recette</strong> pour la publier—votre recette sera désormais visible par tous !",
        ],
      },
      {
        heading: "Gérer Vos Recettes",
        content: "Gardez votre collection de recettes organisée :",
        list: [
          "Allez à <strong>Mes Recettes</strong> dans la barre de navigation pour voir toutes les recettes que vous avez publiées.",
          "Cliquez sur <strong>Modifier</strong> pour mettre à jour les détails ou l’image d’une recette.",
          "Utilisez les options de tri pour organiser vos recettes par nom ou par date.",
        ],
      },
      {
        heading: "Interagir avec la Communauté",
        content: "Échangez avec d’autres amateurs de cuisine :",
        list: [
          "Sur une page de recette, descendez jusqu’à la section <strong>Commentaires</strong>.",
          "Ajoutez vos pensées ou astuces en tapant dans la boîte de commentaire et en cliquant sur <strong>Publier le Commentaire</strong>.",
          "Consultez les <strong>Recettes Associées</strong> en bas de chaque page de recette pour plus d’inspiration.",
        ],
      },
      {
        heading: "Besoin d’Aide ?",
        content:
          "Si vous avez des questions ou rencontrez des problèmes, nous sommes là pour vous aider :",
        list: [
          "Contactez-nous à <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> pour obtenir de l’aide.",
          "Consultez la <strong>Politique de Confidentialité</strong> pour plus de détails sur la gestion de vos données.",
        ],
      },
    ],
  },
  es: {
    "Recipe App": "Plataforma de Recetas",
    title: "Cómo Usar la Plataforma de Recetas",
    lastUpdated: "Última actualización: 26 de marzo de 2025",
    sections: [
      {
        heading: "Comenzando",
        content:
          "¡Bienvenido a la Plataforma de Recetas! Ya seas un entusiasta de la comida que desea compartir tus creaciones culinarias o alguien en busca de nuevas recetas para probar, esta guía te ayudará a navegar por nuestras funciones con facilidad.",
      },
      {
        heading: "Crear una Cuenta",
        content:
          "Para empezar a compartir tus propias recetas y comentar las de otros, necesitarás una cuenta. Aquí te explicamos cómo:",
        list: [
          "Haz clic en <strong>Registrarse</strong> en la barra de navegación.",
          "Regístrate con tu correo electrónico y una contraseña, o usa tu cuenta de Google para una configuración rápida.",
          "¡Una vez registrado, estarás listo para contribuir a la comunidad!",
        ],
      },
      {
        heading: "Iniciar Sesión",
        content: "Si ya tienes una cuenta, iniciar sesión es sencillo:",
        list: [
          "Haz clic en <strong>Iniciar Sesión</strong> en la barra de navegación.",
          "Ingresa tu correo electrónico y contraseña, o inicia sesión con Google.",
          "Serás dirigido a la página principal donde podrás explorar recetas.",
        ],
      },
      {
        heading: "Explorar Recetas",
        content: "Descubre una variedad de recetas de nuestra comunidad:",
        list: [
          "Usa la <strong>Barra de búsqueda</strong> en la página principal para encontrar recetas por nombre.",
          "Filtra por categoría (por ejemplo, Desayuno, Cena) o ordena alfabéticamente o por fecha.",
          "Haz clic en <strong>Ver Receta</strong> en cualquier tarjeta de receta para ver todos los detalles.",
        ],
      },
      {
        heading: "Agregar una Receta",
        content: "Comparte tus platos favoritos con el mundo:",
        list: [
          "Haz clic en <strong>Agregar Receta</strong> en la barra de navegación (debes estar conectado).",
          "Completa el formulario con el título, la descripción, los ingredientes, los pasos, la categoría y una imagen opcional de tu receta.",
          "Haz clic en <strong>Agregar Receta</strong> para publicarla—¡tu receta ahora será visible para todos!",
        ],
      },
      {
        heading: "Gestionar Tus Recetas",
        content: "Mantén tu colección de recetas organizada:",
        list: [
          "Ve a <strong>Mis Recetas</strong> en la barra de navegación para ver todas las recetas que has publicado.",
          "Haz clic en <strong>Editar</strong> para actualizar los detalles o la imagen de una receta.",
          "Usa las opciones de ordenación para organizar tus recetas por nombre o fecha.",
        ],
      },
      {
        heading: "Interactuar con la Comunidad",
        content: "Conecta con otros amantes de la comida:",
        list: [
          "En una página de receta, desplázate hasta la sección <strong>Comentarios</strong>.",
          "Añade tus pensamientos o consejos escribiendo en el cuadro de comentarios y haciendo clic en <strong>Publicar Comentario</strong>.",
          "Revisa las <strong>Recetas Relacionadas</strong> al final de cada página de receta para más inspiración.",
        ],
      },
      {
        heading: "¿Necesitas Ayuda?",
        content:
          "Si tienes preguntas o encuentras problemas, estamos aquí para ayudarte:",
        list: [
          "Contáctanos en <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> para soporte.",
          "Consulta la <strong>Política de Privacidad</strong> para detalles sobre cómo manejamos tus datos.",
        ],
      },
    ],
  },
  pt: {
    "Recipe App": "Plataforma de Receitas",
    title: "Como Usar a Plataforma de Receitas",
    lastUpdated: "Última atualização: 26 de março de 2025",
    sections: [
      {
        heading: "Começando",
        content:
          "Bem-vindo à Plataforma de Receitas! Seja você um entusiasta da culinária querendo compartilhar suas criações ou alguém buscando novas receitas para experimentar, este guia o ajudará a navegar por nossos recursos com facilidade.",
      },
      {
        heading: "Criar uma Conta",
        content:
          "Para começar a compartilhar suas próprias receitas e comentar as dos outros, você precisará de uma conta. Veja como:",
        list: [
          "Clique em <strong>Registrar</strong> na barra de navegação.",
          "Registre-se com seu e-mail e uma senha, ou use sua conta do Google para uma configuração rápida.",
          "Após o registro, você estará pronto para contribuir com a comunidade!",
        ],
      },
      {
        heading: "Fazer Login",
        content: "Se você já tem uma conta, fazer login é simples:",
        list: [
          "Clique em <strong>Login</strong> na barra de navegação.",
          "Insira seu e-mail e senha, ou faça login com o Google.",
          "Você será direcionado à página inicial onde poderá explorar receitas.",
        ],
      },
      {
        heading: "Explorar Receitas",
        content: "Descubra uma variedade de receitas da nossa comunidade:",
        list: [
          "Use a <strong>Barra de Pesquisa</strong> na página inicial para encontrar receitas por nome.",
          "Filtre por categoria (ex.: Café da Manhã, Jantar) ou ordene alfabeticamente ou por data.",
          "Clique em <strong>Ver Receita</strong> em qualquer cartão de receita para ver todos os detalhes.",
        ],
      },
      {
        heading: "Adicionar uma Receita",
        content: "Compartilhe seus pratos favoritos com o mundo:",
        list: [
          "Clique em <strong>Adicionar Receita</strong> na barra de navegação (você deve estar logado).",
          "Preencha o formulário com o título, descrição, ingredientes, passos, categoria e uma imagem opcional da sua receita.",
          "Clique em <strong>Adicionar Receita</strong> para publicá-la—sua receita agora será visível para todos!",
        ],
      },
      {
        heading: "Gerenciar Suas Receitas",
        content: "Mantenha sua coleção de receitas organizada:",
        list: [
          "Vá para <strong>Minhas Receitas</strong> na barra de navegação para ver todas as receitas que você postou.",
          "Clique em <strong>Editar</strong> para atualizar os detalhes ou a imagem de uma receita.",
          "Use as opções de ordenação para organizar suas receitas por nome ou data.",
        ],
      },
      {
        heading: "Interagir com a Comunidade",
        content: "Converse com outros amantes da culinária:",
        list: [
          "Na página de uma receita, role até a seção <strong>Comentários</strong>.",
          "Adicione seus pensamentos ou dicas digitando na caixa de comentários e clicando em <strong>Postar Comentário</strong>.",
          "Confira as <strong>Receitas Relacionadas</strong> no final de cada página de receita para mais inspiração.",
        ],
      },
      {
        heading: "Precisa de Ajuda?",
        content:
          "Se você tiver dúvidas ou enfrentar problemas, estamos aqui para ajudar:",
        list: [
          "Entre em contato conosco em <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> para suporte.",
          "Consulte a <strong>Política de Privacidade</strong> para detalhes sobre como lidamos com seus dados.",
        ],
      },
    ],
  },
  de: {
    "Recipe App": "Rezeptplattform",
    title: "Wie man die Rezeptplattform Nutzt",
    lastUpdated: "Zuletzt aktualisiert: 26. März 2025",
    sections: [
      {
        heading: "Erste Schritte",
        content:
          "Willkommen auf der Rezeptplattform! Egal, ob Sie ein Kochbegeisterter sind, der seine kulinarischen Kreationen teilen möchte, oder jemand, der neue Rezepte ausprobieren will, dieser Leitfaden hilft Ihnen, unsere Funktionen mühelos zu nutzen.",
      },
      {
        heading: "Ein Konto Erstellen",
        content:
          "Um Ihre eigenen Rezepte zu teilen und die anderer zu kommentieren, benötigen Sie ein Konto. So geht’s:",
        list: [
          "Klicken Sie auf <strong>Registrieren</strong> in der Navigationsleiste.",
          "Melden Sie sich mit Ihrer E-Mail und einem Passwort an, oder nutzen Sie Ihr Google-Konto für eine schnelle Einrichtung.",
          "Nach der Registrierung sind Sie bereit, zur Gemeinschaft beizutragen!",
        ],
      },
      {
        heading: "Einloggen",
        content: "Wenn Sie bereits ein Konto haben, ist das Einloggen einfach:",
        list: [
          "Klicken Sie auf <strong>Login</strong> in der Navigationsleiste.",
          "Geben Sie Ihre E-Mail und Ihr Passwort ein, oder melden Sie sich mit Google an.",
          "Sie werden zur Startseite weitergeleitet, wo Sie Rezepte erkunden können.",
        ],
      },
      {
        heading: "Rezepte Entdecken",
        content:
          "Entdecken Sie eine Vielzahl von Rezepten aus unserer Gemeinschaft:",
        list: [
          "Nutzen Sie die <strong>Suchleiste</strong> auf der Startseite, um Rezepte nach Namen zu finden.",
          "Filtern Sie nach Kategorie (z. B. Frühstück, Abendessen) oder sortieren Sie alphabetisch oder nach Datum.",
          "Klicken Sie auf <strong>Rezept Ansehen</strong> auf einer Rezeptkarte, um alle Details zu sehen.",
        ],
      },
      {
        heading: "Ein Rezept Hinzufügen",
        content: "Teilen Sie Ihre Lieblingsgerichte mit der Welt:",
        list: [
          "Klicken Sie auf <strong>Rezept Hinzufügen</strong> in der Navigationsleiste (Sie müssen eingeloggt sein).",
          "Füllen Sie das Formular mit Titel, Beschreibung, Zutaten, Schritten, Kategorie und einem optionalen Bild Ihres Rezepts aus.",
          "Klicken Sie auf <strong>Rezept Hinzufügen</strong>, um es zu veröffentlichen—Ihr Rezept ist jetzt für alle sichtbar!",
        ],
      },
      {
        heading: "Ihre Rezepte Verwalten",
        content: "Halten Sie Ihre Rezeptsammlung organisiert:",
        list: [
          "Gehen Sie zu <strong>Meine Rezepte</strong> in der Navigationsleiste, um alle Ihre veröffentlichten Rezepte zu sehen.",
          "Klicken Sie auf <strong>Bearbeiten</strong>, um die Details oder das Bild eines Rezepts zu aktualisieren.",
          "Nutzen Sie die Sortieroptionen, um Ihre Rezepte nach Name oder Datum zu ordnen.",
        ],
      },
      {
        heading: "Mit der Gemeinschaft Interagieren",
        content: "Tauschen Sie sich mit anderen Kochliebhabern aus:",
        list: [
          "Scrollen Sie auf einer Rezeptseite zur Sektion <strong>Kommentare</strong>.",
          "Fügen Sie Ihre Gedanken oder Tipps hinzu, indem Sie in das Kommentarfeld schreiben und auf <strong>Kommentar Posten</strong> klicken.",
          "Schauen Sie sich die <strong>Ähnlichen Rezepte</strong> am Ende jeder Rezeptseite für mehr Inspiration an.",
        ],
      },
      {
        heading: "Brauchen Sie Hilfe?",
        content:
          "Wenn Sie Fragen haben oder auf Probleme stoßen, sind wir für Sie da:",
        list: [
          "Kontaktieren Sie uns unter <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> für Unterstützung.",
          "Schauen Sie in die <strong>Datenschutzrichtlinie</strong> für Details, wie wir Ihre Daten verwalten.",
        ],
      },
    ],
  },
  it: {
    "Recipe App": "Piattaforma di Condivisione Ricette",
    title: "Come Usare la Piattaforma di Condivisione Ricette",
    lastUpdated: "Ultimo aggiornamento: 26 marzo 2025",
    sections: [
      {
        heading: "Iniziare",
        content:
          "Benvenuto sulla Piattaforma di Condivisione Ricette! Che tu sia un appassionato di cucina desideroso di condividere le tue creazioni culinarie o qualcuno in cerca di nuove ricette da provare, questa guida ti aiuterà a navigare facilmente tra le nostre funzionalità.",
      },
      {
        heading: "Creare un Account",
        content:
          "Per iniziare a condividere le tue ricette e commentare quelle degli altri, avrai bisogno di un account. Ecco come fare:",
        list: [
          "Clicca su <strong>Registrati</strong> nella barra di navigazione.",
          "Registrati con la tua email e una password, oppure usa il tuo account Google per una configurazione veloce.",
          "Una volta registrato, sarai pronto a contribuire alla comunità!",
        ],
      },
      {
        heading: "Accedere",
        content: "Se hai già un account, accedere è semplice:",
        list: [
          "Clicca su <strong>Accedi</strong> nella barra di navigazione.",
          "Inserisci la tua email e password, oppure accedi con Google.",
          "Sarai reindirizzato alla homepage dove potrai esplorare le ricette.",
        ],
      },
      {
        heading: "Esplorare le Ricette",
        content: "Scopri una varietà di ricette dalla nostra comunità:",
        list: [
          "Usa la <strong>Barra di ricerca</strong> nella homepage per trovare ricette per nome.",
          "Filtra per categoria (es. Colazione, Cena) o ordina alfabeticamente o per data.",
          "Clicca su <strong>Visualizza Ricetta</strong> su una scheda ricetta per vedere tutti i dettagli.",
        ],
      },
      {
        heading: "Aggiungere una Ricetta",
        content: "Condividi i tuoi piatti preferiti con il mondo:",
        list: [
          "Clicca su <strong>Aggiungi Ricetta</strong> nella barra di navigazione (devi essere loggato).",
          "Compila il modulo con il titolo, la descrizione, gli ingredienti, i passaggi, la categoria e un’immagine opzionale della tua ricetta.",
          "Clicca su <strong>Aggiungi Ricetta</strong> per pubblicarla—la tua ricetta sarà ora visibile a tutti!",
        ],
      },
      {
        heading: "Gestire le Tue Ricette",
        content: "Mantieni organizzata la tua collezione di ricette:",
        list: [
          "Vai su <strong>Le Mie Ricette</strong> nella barra di navigazione per vedere tutte le ricette che hai pubblicato.",
          "Clicca su <strong>Modifica</strong> per aggiornare i dettagli o l’immagine di una ricetta.",
          "Usa le opzioni di ordinamento per organizzare le tue ricette per nome o data.",
        ],
      },
      {
        heading: "Interagire con la Comunità",
        content: "Connettiti con altri amanti del cibo:",
        list: [
          "Su una pagina di ricetta, scorri fino alla sezione <strong>Commenti</strong>.",
          "Aggiungi i tuoi pensieri o suggerimenti scrivendo nella casella dei commenti e cliccando su <strong>Pubblica Commento</strong>.",
          "Controlla le <strong>Ricette Correlate</strong> in fondo a ogni pagina di ricetta per ulteriori ispirazioni.",
        ],
      },
      {
        heading: "Hai Bisogno di Aiuto?",
        content: "Se hai domande o incontri problemi, siamo qui per aiutarti:",
        list: [
          "Contattaci a <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> per supporto.",
          "Consulta la <strong>Politica sulla Privacy</strong> per dettagli su come gestiamo i tuoi dati.",
        ],
      },
    ],
  },
  ru: {
    "Recipe App": "Платформа Обмена Рецептами",
    title: "Как Использовать Платформу Обмена Рецептами",
    lastUpdated: "Последнее обновление: 26 марта 2025 года",
    sections: [
      {
        heading: "Начало Работы",
        content:
          "Добро пожаловать на Платформу Обмена Рецептами! Будь вы энтузиастом кулинарии, желающим поделиться своими кулинарными шедеврами, или человеком, ищущим новые рецепты для пробы, это руководство поможет вам легко освоить наши функции.",
      },
      {
        heading: "Создать Аккаунт",
        content:
          "Чтобы начать делиться своими рецептами и комментировать чужие, вам понадобится аккаунт. Вот как это сделать:",
        list: [
          "Нажмите <strong>Зарегистрироваться</strong> в панели навигации.",
          "Зарегистрируйтесь, указав email и пароль, или используйте аккаунт Google для быстрой настройки.",
          "После регистрации вы будете готовы внести свой вклад в сообщество!",
        ],
      },
      {
        heading: "Войти",
        content: "Если у вас уже есть аккаунт, вход прост:",
        list: [
          "Нажмите <strong>Войти</strong> в панели навигации.",
          "Введите ваш email и пароль или войдите через Google.",
          "Вы будете перенаправлены на главную страницу, где сможете изучить рецепты.",
        ],
      },
      {
        heading: "Изучить Рецепты",
        content: "Откройте для себя множество рецептов от нашего сообщества:",
        list: [
          "Используйте <strong>Строка поиска</strong> на главной странице, чтобы найти рецепты по названию.",
          "Фильтруйте по категориям (например, Завтрак, Ужин) или сортируйте по алфавиту или дате.",
          "Нажмите <strong>Посмотреть Рецепт</strong> на любой карточке рецепта, чтобы увидеть полные детали.",
        ],
      },
      {
        heading: "Добавить Рецепт",
        content: "Поделитесь своими любимыми блюдами с миром:",
        list: [
          "Нажмите <strong>Добавить Рецепт</strong> в панели навигации (вы должны быть авторизованы).",
          "Заполните форму с названием, описанием, ингредиентами, шагами, категорией и необязательным изображением вашего рецепта.",
          "Нажмите <strong>Добавить Рецепт</strong> для публикации—теперь ваш рецепт виден всем!",
        ],
      },
      {
        heading: "Управлять Своими Рецептами",
        content: "Держите свою коллекцию рецептов в порядке:",
        list: [
          "Перейдите в <strong>Мои Рецепты</strong> в панели навигации, чтобы увидеть все ваши опубликованные рецепты.",
          "Нажмите <strong>Редактировать</strong>, чтобы обновить детали или изображение рецепта.",
          "Используйте опции сортировки, чтобы упорядочить рецепты по названию или дате.",
        ],
      },
      {
        heading: "Взаимодействовать с Сообществом",
        content: "Общайтесь с другими любителями еды:",
        list: [
          "На странице рецепта прокрутите до раздела <strong>Комментарии</strong>.",
          "Добавьте свои мысли или советы, введя текст в поле для комментариев и нажав <strong>Опубликовать Комментарий</strong>.",
          "Ознакомьтесь с <strong>Похожими Рецептами</strong> внизу каждой страницы рецепта для вдохновения.",
        ],
      },
      {
        heading: "Нужна Помощь?",
        content:
          "Если у вас есть вопросы или возникли проблемы, мы готовы помочь:",
        list: [
          "Свяжитесь с нами по адресу <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a> для поддержки.",
          "Ознакомьтесь с <strong>Политикой Конфиденциальности</strong> для деталей о том, как мы обрабатываем ваши данные.",
        ],
      },
    ],
  },
  ja: {
    "Recipe App": "レシピ共有プラットフォーム",
    title: "レシピ共有プラットフォームの使い方",
    lastUpdated: "最終更新日：2025年3月26日",
    sections: [
      {
        heading: "はじめに",
        content:
          "レシピ共有プラットフォームへようこそ！料理愛好家として自分の創作料理を共有したい方、新しいレシピを試したい方、どちらであっても、このガイドは当プラットフォームの機能を簡単に使いこなすお手伝いをします。",
      },
      {
        heading: "アカウントを作成する",
        content:
          "自分のレシピを共有したり、他の人のレシピにコメントするには、アカウントが必要です。方法はこちら：",
        list: [
          "ナビゲーションバーで<strong>登録</strong>をクリックします。",
          "メールアドレスとパスワードで登録するか、Googleアカウントを使って簡単に設定します。",
          "登録が完了すると、コミュニティに参加する準備が整います！",
        ],
      },
      {
        heading: "ログインする",
        content: "すでにアカウントをお持ちの場合、ログインは簡単です：",
        list: [
          "ナビゲーションバーで<strong>ログイン</strong>をクリックします。",
          "メールアドレスとパスワードを入力するか、Googleでログインします。",
          "ホームページにリダイレクトされ、レシピを探索できます。",
        ],
      },
      {
        heading: "レシピを探索する",
        content: "コミュニティからのさまざまなレシピを発見してください：",
        list: [
          "ホームページの<strong>検索バー</strong>を使って名前でレシピを検索します。",
          "カテゴリ（例：朝食、夕食）でフィルタリングするか、アルファベット順または日付順に並べ替えます。",
          "レシピカードの<strong>レシピを見る</strong>をクリックして詳細を確認します。",
        ],
      },
      {
        heading: "レシピを追加する",
        content: "お気に入りの料理を世界と共有しましょう：",
        list: [
          "ナビゲーションバーで<strong>レシピを追加</strong>をクリックします（ログインが必要です）。",
          "レシピのタイトル、説明、材料、手順、カテゴリ、オプションの画像をフォームに入力します。",
          "<strong>レシピを追加</strong>をクリックして公開します—これであなたのレシピが全員に見えます！",
        ],
      },
      {
        heading: "自分のレシピを管理する",
        content: "レシピコレクションを整理してください：",
        list: [
          "ナビゲーションバーの<strong>マイレシピ</strong>に移動して、あなたが投稿したすべてのレシピを確認します。",
          "<strong>編集</strong>をクリックしてレシピの詳細や画像を更新します。",
          "並べ替えオプションを使って、レシピを名前または日付で整理します。",
        ],
      },
      {
        heading: "コミュニティと交流する",
        content: "他の料理愛好家と交流しましょう：",
        list: [
          "レシピページで<strong>コメント</strong>セクションまでスクロールします。",
          "コメントボックスに意見やヒントを入力し、<strong>コメントを投稿</strong>をクリックして追加します。",
          "各レシピページ下部の<strong>関連レシピ</strong>をチェックして、さらにインスピレーションを得ましょう。",
        ],
      },
      {
        heading: "ヘルプが必要ですか？",
        content: "質問がある場合や問題に直面した場合、私たちがサポートします：",
        list: [
          "サポートのために<a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a>までご連絡ください。",
          "データの取り扱いに関する詳細は<strong>プライバシーポリシー</strong>をご確認ください。",
        ],
      },
    ],
  },
  ko: {
    "Recipe App": "레시피 공유 플랫폼",
    title: "레시피 공유 플랫폼 사용 방법",
    lastUpdated: "최종 업데이트: 2025년 3월 26일",
    sections: [
      {
        heading: "시작하기",
        content:
          "레시피 공유 플랫폼에 오신 것을 환영합니다! 요리 애호가로서 자신의 요리 창작물을 공유하고 싶거나 새로운 레시피를 시도하고 싶은 분이라면, 이 가이드가 플랫폼 기능을 쉽게 탐색하는 데 도움이 될 것입니다.",
      },
      {
        heading: "계정 만들기",
        content:
          "자신의 레시피를 공유하고 다른 사람의 레시피에 댓글을 달기 위해서는 계정이 필요합니다. 방법은 다음과 같습니다:",
        list: [
          "네비게이션 바에서 <strong>등록</strong>을 클릭하세요.",
          "이메일과 비밀번호로 가입하거나 Google 계정을 사용해 빠르게 설정하세요.",
          "등록이 완료되면 커뮤니티에 기여할 준비가 됩니다!",
        ],
      },
      {
        heading: "로그인",
        content: "이미 계정이 있다면 로그인은 간단합니다:",
        list: [
          "네비게이션 바에서 <strong>로그인</strong>을 클릭하세요.",
          "이메일과 비밀번호를 입력하거나 Google로 로그인하세요.",
          "홈페이지로 이동하여 레시피를 탐색할 수 있습니다.",
        ],
      },
      {
        heading: "레시피 탐색",
        content: "커뮤니티에서 제공하는 다양한 레시피를 발견하세요:",
        list: [
          "홈페이지의 <strong>검색창</strong>을 사용해 이름으로 레시피를 찾으세요.",
          "카테고리(예: 아침, 저녁)로 필터링하거나 알파벳순 또는 날짜순으로 정렬하세요.",
          "레시피 카드에서 <strong>레시피 보기</strong>를 클릭해 자세한 내용을 확인하세요.",
        ],
      },
      {
        heading: "레시피 추가",
        content: "좋아하는 요리를 세상과 공유하세요:",
        list: [
          "네비게이션 바에서 <strong>레시피 추가</strong>를 클릭하세요 (로그인 필요).",
          "레시피의 제목, 설명, 재료, 단계, 카테고리, 선택적 이미지를 양식에 채우세요.",
          "<strong>레시피 추가</strong>를 클릭해 게시하세요—이제 당신의 레시피가 모두에게 보입니다!",
        ],
      },
      {
        heading: "내 레시피 관리",
        content: "레시피 컬렉션을 정리하세요:",
        list: [
          "네비게이션 바의 <strong>내 레시피</strong>로 이동해 게시한 모든 레시피를 확인하세요.",
          "<strong>편집</strong>을 클릭해 레시피의 세부 정보 또는 이미지를 업데이트하세요.",
          "정렬 옵션을 사용해 레시피를 이름 또는 날짜별로 정리하세요.",
        ],
      },
      {
        heading: "커뮤니티와 소통",
        content: "다른 요리 애호가들과 교류하세요:",
        list: [
          "레시피 페이지에서 <strong>댓글</strong> 섹션으로 스크롤하세요.",
          "댓글 상자에 의견이나 팁을 입력하고 <strong>댓글 게시</strong>를 클릭해 추가하세요.",
          "각 레시피 페이지 하단의 <strong>관련 레시피</strong>를 확인해 더 많은 영감을 얻으세요.",
        ],
      },
      {
        heading: "도움이 필요하세요?",
        content: "질문이 있거나 문제가 생기면 저희가 도와드리겠습니다:",
        list: [
          "지원을 위해 <a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a>으로 연락 주세요.",
          "데이터 처리에 대한 자세한 내용은 <strong>개인정보 보호정책</strong>을 확인하세요.",
        ],
      },
    ],
  },
  zh: {
    "Recipe App": "食谱分享平台",
    title: "如何使用食谱分享平台",
    lastUpdated: "最后更新：2025年3月26日",
    sections: [
      {
        heading: "开始使用",
        content:
          "欢迎来到食谱分享平台！无论您是想分享自己烹饪创意的美食爱好者，还是寻找新食谱尝试的人，本指南将帮助您轻松掌握我们的功能。",
      },
      {
        heading: "创建账户",
        content:
          "要开始分享您自己的食谱并评论他人的食谱，您需要一个账户。操作方法如下：",
        list: [
          "点击导航栏中的<strong>注册</strong>。",
          "使用您的电子邮件和密码注册，或使用Google账户快速设置。",
          "注册完成后，您就可以为社区做出贡献了！",
        ],
      },
      {
        heading: "登录",
        content: "如果您已有账户，登录很简单：",
        list: [
          "点击导航栏中的<strong>登录</strong>。",
          "输入您的电子邮件和密码，或使用Google登录。",
          "您将被重定向到主页，可以开始探索食谱。",
        ],
      },
      {
        heading: "探索食谱",
        content: "发现我们社区中的各种食谱：",
        list: [
          "使用主页上的<strong>搜索栏</strong>按名称查找食谱。",
          "按类别（例如早餐、晚餐）过滤或按字母顺序或日期排序。",
          "点击任何食谱卡上的<strong>查看食谱</strong>以查看完整详情。",
        ],
      },
      {
        heading: "添加食谱",
        content: "与世界分享您喜爱的菜肴：",
        list: [
          "点击导航栏中的<strong>添加食谱</strong>（需登录）。",
          "填写表单，包括食谱的标题、描述、原料、步骤、类别和可选图片。",
          "点击<strong>添加食谱</strong>发布—您的食谱现在对所有人可见！",
        ],
      },
      {
        heading: "管理您的食谱",
        content: "保持您的食谱收藏井然有序：",
        list: [
          "前往导航栏中的<strong>我的食谱</strong>，查看您发布的所有食谱。",
          "点击<strong>编辑</strong>更新食谱的详细信息或图片。",
          "使用排序选项按名称或日期整理您的食谱。",
        ],
      },
      {
        heading: "与社区互动",
        content: "与其他美食爱好者交流：",
        list: [
          "在食谱页面上，滚动到<strong>评论</strong>部分。",
          "在评论框中输入您的想法或建议，然后点击<strong>发布评论</strong>添加。",
          "查看每页食谱底部的<strong>相关食谱</strong>，获取更多灵感。",
        ],
      },
      {
        heading: "需要帮助？",
        content: "如果您有疑问或遇到问题，我们随时为您提供帮助：",
        list: [
          "通过<a href='mailto:tung.42@gmail.com'>tung.42@gmail.com</a>联系我们以获取支持。",
          "查看<strong>隐私政策</strong>，了解我们如何处理您的数据的详细信息。",
        ],
      },
    ],
  },
};

const Instructions = () => {
  const { language } = useLanguage();
  const translation =
    instructionsTranslations[language] || instructionsTranslations["vi"]; // Fallback to English

  return (
    <>
      <Helmet>
        <title>
          {translation.title} - {translation["Recipe App"]}
        </title>
        <meta
          property="og:title"
          content={`${translation.title} - ${translation["Recipe App"]}`}
        />
        <meta
          property="og:description"
          content={translation.sections[0].content.slice(0, 150) + "..."}
        />
      </Helmet>
      <Card>
        <Card.Body>
          <h2 className="mb-3">
            <FontAwesomeIcon icon={faBook} className="me-2" />
            {translation.title}
          </h2>
          <Card.Subtitle className="mb-4 text-muted">
            {translation.lastUpdated}
          </Card.Subtitle>

          {translation.sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h5 className="text-primary">
                <FontAwesomeIcon
                  icon={
                    index === 0
                      ? faInfoCircle
                      : index === 1
                      ? faUserPlus
                      : index === 2
                      ? faSignInAlt
                      : index === 3
                      ? faSearch
                      : index === 4
                      ? faPlus
                      : index === 5
                      ? faPencilAlt
                      : index === 6
                      ? faComment
                      : faEye
                  }
                  className="me-2"
                />
                {section.heading}
              </h5>
              <Card.Text
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
              {section.list && (
                <ListGroup variant="flush">
                  {section.list.map((item, idx) => (
                    <ListGroup.Item
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ListGroup>
              )}
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default Instructions;
