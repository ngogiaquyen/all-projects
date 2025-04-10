import { ThemeModeProvider } from './ThemeModeProvider';

function CombinedProvider({ children }) {
  return <ThemeModeProvider>{children}</ThemeModeProvider>;
}

export default CombinedProvider;
