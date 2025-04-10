import routes from '~/configs';
import BeNgoan from '~/Layouts/components/BeNgoanCard';
import Confirm from '~/Layouts/components/Confirm';
import DevelopmentNotice from '~/pages/DevelopmentNotice';
import EmptyLayout from '~/Layouts/EmptyLayout';
import NotFoundPage from '~/pages/NotFoundPage';
import ToolList from '~/pages/ToolList';
import EnglishHome from '~/pages/learnEnglish/EnglishHome';
import Vocabulary from '~/pages/learnEnglish/Vocabulary';
import ListeningPage from '~/pages/learnEnglish/ListeningPage';
import ChatWithAIPage from '~/pages/learnEnglish/ChatWithAIPage';
import WritingPractice from '~/pages/learnEnglish/WritingPractice';
import TestPage from '~/pages/TestPage';
import BeNgoanPage from '~/pages/BeNgoanPage/BeNgoanPage';
import TiktokShopPage from '~/pages/TiktokShopPage';
import CreateProductPage from '~/pages/CreateProductPage/CreateProductPage';
import EditProductPage from '~/pages/EditProductPage';
import ProductDetailPage from '~/pages/ProductDetailPage';

export const publicRouters = [
  // home page
  {
    component: ToolList,
    path: routes.home,
    layout: EmptyLayout,
  },
  // dev page
  // {
  //   component: DevelopmentNotice,
  //   path: routes.home,
  //   layout: EmptyLayout,
  // },
  {
    component: NotFoundPage,
    path: routes.notFound,
    layout: EmptyLayout,
  },
  {
    component: Confirm,
    path: routes.confirm,
    layout: EmptyLayout,
  },
  {
    component: BeNgoanPage,
    path: routes.beNgoan,
    layout: EmptyLayout,
  },
  // english page
  {
    component: EnglishHome,
    path: routes.englishPage,
    layout: EmptyLayout,
  },
  {
    component: Vocabulary,
    path: routes.vocabulary,
    layout: EmptyLayout,
  },
  {
    component: WritingPractice,
    path: routes.writing,
    layout: EmptyLayout,
  },
  {
    component: ListeningPage,
    path: routes.listening,
    layout: EmptyLayout,
  },
  {
    component: ChatWithAIPage,
    path: routes.chatWithAI,
    layout: EmptyLayout,
  },
  // test page
  {
    component: TestPage,
    path: routes.test,
    layout: EmptyLayout,
  },
  // shop page
  {
    component: TiktokShopPage,
    path: routes.shop,
    layout: EmptyLayout,
  },
  {
    component: CreateProductPage,
    path: routes.createProduct,
    layout: EmptyLayout,
  },
  {
    component: EditProductPage,
    path: routes.editProduct,
    layout: EmptyLayout,
  },
  {
    component: ProductDetailPage,
    path: routes.productDetail + "/:id",
    layout: EmptyLayout,
  },

  // other page
];

export const privateRouters = [];
