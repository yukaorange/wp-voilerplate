import Component from '@ts/abstract/Component'

interface ResourceLoaderInterface {
  init: () => void
  destroy: () => void
}

export class ResourceLoader extends Component implements ResourceLoaderInterface {
  private page: number = 2
  private isLoading: boolean = false

  constructor() {
    super({
      element: '[data-ui="gallery"]',
      elements: {
        grid: '[data-ui="resource-grid"]',
        items: '[data-ui="resource"]',
        loading: '[data-ui="resource-loading"]',
        loadMoreButton: '[data-ui="load-more"]',
      },
    })
  }

  public init() {
    this.addEventListeners()
  }

  private addEventListeners(): void {
    this.elements.loadMoreButton?.addEventListener('click', () => {
      this.loadMoreResources()
    })
  }

  /**
   * 現在のURLからフィルター状態を取得
   * URLSearchParamsを使用してクエリパラメータを解析
   * @returns {tech: string, format: string}
   */
  private getCurrentFilters(): { tech: string; format: string } {
    const urlParams = new URLSearchParams(window.location.search)

    return {
      tech: urlParams.get('tech') || '',
      format: urlParams.get('format') || '',
    }
  }

  private async loadMoreResources(): Promise<void> {
    if (this.isLoading) return

    // ajaxurlがグローバルに定義されていることを確認
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ajaxUrl = (window as any).ajaxurl

    if (!ajaxUrl) {
      console.error('Ajax URL not found')
      return
    }

    try {
      this.isLoading = true
      this.elements.loading.style.display = 'block'
      this.elements.loadMoreButton.style.display = 'none'

      const filters = this.getCurrentFilters()

      // POSTリクエストのデータを構築
      const formData = new FormData()
      formData.append('action', 'load_more_resources')
      formData.append('page', this.page.toString())
      formData.append('tech', filters.tech)
      formData.append('format', filters.format)

      // Fetch APIを使用してAjaxリクエストを送信
      const response = await fetch(ajaxUrl, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // 新しいコンテンツが存在する場合、DOMに追加
      if (data.html) {
        this.elements.grid.insertAdjacentHTML('beforeend', data.html)

        this.page++ // 次のページ番号を準備

        this.elements.loadMoreButton.style.display = data.show_button ? 'block' : 'none'
      }
    } catch (error) {
      console.error('Error loading resources:', error)
      // エラー時はボタンを再表示
      this.elements.loadMoreButton.style.display = 'block'
    } finally {
      this.isLoading = false
      this.elements.loading.style.display = 'none'
    }
  }

  public destroy(): void {
    this.elements.loadMoreButton?.removeEventListener('click', () => {
      this.loadMoreResources()
    })
  }
}
