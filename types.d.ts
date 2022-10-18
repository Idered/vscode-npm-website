type Dependency = {
  name: string;
  version: string;
  isDev?: boolean;
  isVulnerable?: boolean;
  isLoading?: boolean;
};
type Suggestion = {
  name: string;
  version: string;
  downloads: string;
  gzip?: string;
  description: string;
  highlight?: string;
};
