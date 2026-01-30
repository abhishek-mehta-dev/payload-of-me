interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  homepage?: string;
}

class GitHubService {
  private readonly username = 'abhishek-mehta-dev';
  private readonly baseUrl = 'https://api.github.com';
  
  async getUserProfile(): Promise<GitHubUser | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub user profile:', error);
      return null;
    }
  }
  
  async getUserRepositories(limit: number = 10): Promise<GitHubRepo[] | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users/${this.username}/repos?per_page=${limit}&sort=updated&type=public`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 1800 } // Cache for 30 minutes
        }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return null;
    }
  }
  
  async getRepositoryLanguages(repoName: string): Promise<Record<string, number> | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.username}/${repoName}/languages`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 7200 } // Cache for 2 hours
        }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching repository languages:', error);
      return null;
    }
  }
  
  formatUserProfile(user: GitHubUser): string {
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
    
    return `💻 **GitHub Profile - ${user.name}**

**Bio:** ${user.bio}
**Location:** ${user.location}
**GitHub:** [${user.login}](${user.html_url})

**Stats:**
• ${user.public_repos} public repositories
• ${user.followers} followers
• ${user.following} following
• Member since ${joinDate}

**Recent Activity:**
Check out the latest projects and contributions on GitHub!`;
  }
  
  formatRepositories(repos: GitHubRepo[]): string {
    if (!repos || repos.length === 0) {
      return "No repositories found.";
    }
    
    const repoList = repos.slice(0, 8).map((repo, index) => {
      const stars = repo.stargazers_count > 0 ? ` ⭐ ${repo.stargazers_count}` : '';
      const language = repo.language ? ` • ${repo.language}` : '';
      const homepage = repo.homepage ? ` • [Live Demo](${repo.homepage})` : '';
      
      return `**${index + 1}. [${repo.name}](${repo.html_url})**${language}${stars}
${repo.description || 'No description available'}${homepage}`;
    }).join('\n\n');
    
    return `🚀 **Recent GitHub Repositories:**

${repoList}

*Showing ${Math.min(repos.length, 8)} most recently updated repositories*`;
  }
  
  async getEnhancedProfile(): Promise<string> {
    const [user, repos] = await Promise.all([
      this.getUserProfile(),
      this.getUserRepositories(10)
    ]);
    
    if (!user) {
      return "Unable to fetch GitHub profile at the moment.";
    }
    
    let result = this.formatUserProfile(user);
    
    if (repos && repos.length > 0) {
      result += '\n\n' + this.formatRepositories(repos);
    }
    
    return result;
  }
}

export const githubService = new GitHubService();
export type { GitHubUser, GitHubRepo };