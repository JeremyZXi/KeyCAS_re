import SilexCms from './js/silex-cms/client.js'
import onboarding from './js/client-plugins/onboarding.js'

// This file is loaded by Silex when the user opens the editor
// Its path is set in the environment variable SILEX_CLIENT_CONFIG in index.js
import websiteInfoPlugin from './plugins/client/website-info.js'
import 'https://unpkg.com/grapesjs-navbar'
export default async function (config) {
    config.addPlugin(websiteInfoPlugin, {})
    config.addPlugin(onboarding, {})
    config.addPublicationTransformers({
        transformPermalink: (path, type) => {
            // Replace /index.html with /
            return type === 'html' && path.endsWith('/index.html') ? path.replace(/index\.html$/, '') : path
        },
    })
    // CMS Plugin
    config.addPlugin(SilexCms, {
        dataSources: [],
        imagePlugin: false,
        i18nPlugin: false,
        fetchPlugin: false,
        // enable11ty: false,
        view: {
            // disableStates: true,
            // disableAttributes: false,
            // disableProperties: true,
        },
    })

    config.on('silex:grapesjs:start', () => {
        const grapesjsNavbar = window['grapesjs-navbar']
        config.grapesJsConfig.plugins = [
            ...config.grapesJsConfig.plugins,
            'grapesjs-navbar',
        ]
    })


    config.on('silex:startup:end', () => {
        const editor = config.getEditor()

        editor.BlockManager.add('features', {
            label: 'Features',
            content: `
    <section style="padding: 50px; background-color: #f9f9f9;">
      <h2 style="text-align: center; margin-bottom: 50px;">Key Features</h2>
      <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
        <div class="feature-card" style="background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 30px; margin: 20px; width: 250px; text-align: center; transition: all 0.3s ease;">
          <i class="fas fa-rocket" style="font-size: 3em; color: #3498db; margin-bottom: 20px;"></i>
          <h3>Fast Performance</h3>
          <p>Lightning-quick load times and smooth interactions.</p>
        </div>
        <div class="feature-card" style="background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 30px; margin: 20px; width: 250px; text-align: center; transition: all 0.3s ease;">
          <i class="fas fa-lock" style="font-size: 3em; color: #2ecc71; margin-bottom: 20px;"></i>
          <h3>Secure & Reliable</h3>
          <p>Top-notch security measures to protect your data.</p>
        </div>
        <div class="feature-card" style="background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 30px; margin: 20px; width: 250px; text-align: center; transition: all 0.3s ease;">
          <i class="fas fa-cogs" style="font-size: 3em; color: #e74c3c; margin-bottom: 20px;"></i>
          <h3>Easy Integration</h3>
          <p>Seamlessly integrate with your existing systems.</p>
        </div>
      </div>
    </section>
    <style>
      .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
    </style>
  `,
            category: 'Preset',
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>'
        })

        editor.Components.addType('responsive-card', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'responsive-card'},
                    components: [
                        {
                            tagName: 'div',
                            attributes: {class: 'card-image-container'},
                            components: [
                                {
                                    tagName: 'img',
                                    type: 'image',
                                    attributes: {class: 'card-img'},
                                    src: 'https://via.placeholder.com/800x600'
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            attributes: {class: 'card-content'},
                            components: [
                                {
                                    tagName: 'h2',
                                    type: 'text',
                                    content: 'Card Title',
                                    attributes: {class: 'card-title'}
                                },
                                {
                                    tagName: 'h3',
                                    type: 'text',
                                    content: 'Card Subtitle',
                                    attributes: {class: 'card-subtitle'}
                                },
                                {
                                    tagName: 'p',
                                    type: 'text',
                                    content: 'This is the card description. You can add more details here.',
                                    attributes: {class: 'card-description'}
                                }
                            ]
                        }
                    ],
                    styles: `
      .responsive-card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }
      .responsive-card {
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease;
        background-color: #fff;
      }
      .card-image-container {
        width: 100%;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        position: relative;
        overflow: hidden;
      }
      .card-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      .responsive-card:hover .card-img {
        transform: scale(1.05);
      }
      .card-content {
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      .card-title {
        font-size: clamp(1.2rem, 4vw, 1.5rem);
        margin: 0 0 8px;
      }
      .card-subtitle {
        font-size: clamp(1rem, 3vw, 1.1rem);
        color: #666;
        margin: 0 0 16px;
      }
      .card-description {
        font-size: clamp(0.9rem, 2.5vw, 1rem);
        line-height: 1.5;
        flex-grow: 1;
      }
      @media (min-width: 768px) {
        .responsive-card {
          flex-direction: row;
        }
        .card-image-container {
          width: 40%;
          padding-top: 0;
          height: auto;
        }
        .card-content {
          width: 60%;
        }
      }
      @media (min-width: 992px) {
        .responsive-card-container {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      }
      @media (min-width: 1200px) {
        .responsive-card-container {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
      }
    `
                }
            }
        });

// Add the component to the blocks
        editor.BlockManager.add('responsive-card', {
            label: 'Card',
            category: 'Basics',
            content: {type: 'responsive-card'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 2c-1.63 0-3.13.79-4 2h8c-.87-1.21-2.37-2-4-2z"/></svg>'
        });

        // Add a new component for the card container
        editor.Components.addType('responsive-card-container', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'responsive-card-container'},
                    components: [
                        {type: 'responsive-card'},
                        {type: 'responsive-card'},
                        {type: 'responsive-card'}
                    ],
                }
            }
        });

// Add the container component to the blocks
        editor.BlockManager.add('responsive-card-container', {
            label: 'Card Container',
            category: 'Basics',
            content: {type: 'responsive-card-container'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/></svg>'
        });

        // Define the header banner component
        editor.Components.addType('header-banner', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'header-banner'},
                    components: [
                        {
                            tagName: 'div',
                            attributes: {class: 'banner-background'},
                            components: [
                                {
                                    tagName: 'img',
                                    type: 'image',
                                    attributes: {class: 'banner-image'},
                                    src: 'https://via.placeholder.com/1600x400'
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            attributes: {class: 'banner-content'},
                            components: [
                                {
                                    tagName: 'h1',
                                    type: 'text',
                                    content: 'Welcome to Our Website',
                                    attributes: {class: 'banner-title'}
                                },
                                {
                                    tagName: 'p',
                                    type: 'text',
                                    content: 'Discover amazing things with us',
                                    attributes: {class: 'banner-subtitle'}
                                }
                            ]
                        }
                    ],
                    traits: [
                        {
                            type: 'number',
                            name: 'min-height',
                            label: 'Min Height (px)',
                            default: 300
                        }
                    ],
                    styles: `
        .header-banner {
          position: relative;
          min-height: 300px;
          overflow: hidden;
        }
        .banner-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .banner-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: inherit;
          padding: 20px;
          color: #fff;
          text-align: center;
        }
        .banner-title {
          font-size: 2.5em;
          margin-bottom: 0.5em;
        }
        .banner-subtitle {
          font-size: 1.2em;
        }
        .banner-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.4);
          z-index: -1;
        }
      `
                }
            },
            view: {
                onRender({el}) {
                    const minHeight = this.model.get('traits').where({name: 'min-height'})[0].get('value');
                    el.style.minHeight = `${minHeight}px`;
                }
            }
        })

// Add the component to the blocks
        editor.BlockManager.add('header-banner', {
            label: 'Header Banner',
            category: 'Basics',
            content: {type: 'header-banner'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h20v6H2V2zm2 2v2h16V4H4zm-2 8h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/></svg>'
        })

        // Define the slider component
        editor.Components.addType('custom-slider', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'custom-slider'},
                    components: [
                        {
                            tagName: 'div',
                            attributes: {class: 'slider-container'},
                            components: [
                                {
                                    tagName: 'div',
                                    attributes: {class: 'slider-wrapper'},
                                    components: [
                                        {
                                            tagName: 'div',
                                            attributes: {class: 'slider-slide'},
                                            components: [
                                                {
                                                    tagName: 'div',
                                                    attributes: {class: 'slide-row'},
                                                    content: ''
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'div',
                                            attributes: {class: 'slider-slide'},
                                            components: [
                                                {
                                                    tagName: 'div',
                                                    attributes: {class: 'slide-row'},
                                                    content: ''
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'div',
                                            attributes: {class: 'slider-slide'},
                                            components: [
                                                {
                                                    tagName: 'div',
                                                    attributes: {class: 'slide-row'},
                                                    content: ''
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'button',
                            attributes: {class: 'slider-arrow slider-arrow-left'},
                            content: '&#10094;'
                        },
                        {
                            tagName: 'button',
                            attributes: {class: 'slider-arrow slider-arrow-right'},
                            content: '&#10095;'
                        }
                    ],
                    traits: [
                        {
                            type: 'checkbox',
                            name: 'loop',
                            label: 'Loop Slides',
                            default: false
                        },
                        {
                            type: 'number',
                            name: 'autoplaySpeed',
                            label: 'Autoplay Speed (ms)',
                            default: 3000
                        }
                    ],
                    script: function () {
                        var slider = this;
                        var container = slider.querySelector('.slider-container');
                        var wrapper = slider.querySelector('.slider-wrapper');
                        var slides = slider.querySelectorAll('.slider-slide');
                        var leftArrow = slider.querySelector('.slider-arrow-left');
                        var rightArrow = slider.querySelector('.slider-arrow-right');
                        var currentIndex = 0;
                        var loop = slider.getAttribute('data-loop') === 'true';
                        var autoplaySpeed = parseInt(slider.getAttribute('data-autoplay-speed')) || 3000;
                        var autoplayInterval;

                        function updateSlidePosition() {
                            wrapper.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
                        }

                        function nextSlide() {
                            currentIndex = (currentIndex + 1) % slides.length;
                            updateSlidePosition();
                            updateArrowVisibility();
                        }

                        function prevSlide() {
                            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                            updateSlidePosition();
                            updateArrowVisibility();
                        }


                        function startAutoplay() {
                            stopAutoplay();
                            autoplayInterval = setInterval(function () {
                                nextSlide();
                                updateArrowVisibility();
                            }, autoplaySpeed);
                        }

                        function stopAutoplay() {
                            clearInterval(autoplayInterval);
                        }


                        function updateArrowVisibility() {
                            leftArrow.style.display = 'block';
                            rightArrow.style.display = 'block';

                            if (!loop) {
                                if (currentIndex === 0) {
                                    leftArrow.style.display = 'none'; // 如果是第一页，隐藏向前箭头
                                }
                                if (currentIndex === slides.length - 1) {
                                    rightArrow.style.display = 'none'; // 如果是最后一页，隐藏向后箭头
                                }
                            }
                        }


                        leftArrow.addEventListener('click', function () {
                            prevSlide();
                            stopAutoplay();
                            updateArrowVisibility();
                        });

                        rightArrow.addEventListener('click', function () {
                            nextSlide();
                            stopAutoplay();
                            updateArrowVisibility();
                        });

                        container.addEventListener('mouseenter', stopAutoplay);
                        container.addEventListener('mouseleave', startAutoplay);

                        // Initialize
                        updateSlidePosition();
                        updateArrowVisibility();
                        startAutoplay();
                    },
                    styles: `
        .custom-slider {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          overflow: hidden;
        }
        .slider-container {
          width: 100%;
          overflow: hidden;
        }
        .slider-wrapper {
          display: flex;
          transition: transform 0.3s ease-in-out;
        }
        .slider-slide {
          flex: 0 0 100%;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide-row {
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 18px;
        }
        .slider-arrow-left {
          left: 10px;
        }
        .slider-arrow-right {
          right: 10px;
        }
      `
                }
            },
            view: {
                onRender({el}) {
                    const loop = this.model.get('traits').where({name: 'loop'})[0].get('value');
                    const autoplaySpeed = this.model.get('traits').where({name: 'autoplaySpeed'})[0].get('value');
                    el.setAttribute('data-loop', loop);
                    el.setAttribute('data-autoplay-speed', autoplaySpeed);
                }
            }
        })

// Add the component to the blocks
        editor.BlockManager.add('custom-slider', {
            label: 'Slider',
            category: 'Extra',
            content: {type: 'custom-slider'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h20v12H2V6zm2 2v8h16V8H4zm7 6V9l5 2.5-5 2.5zm-5 5h12v1H6v-1z"/></svg>'
        })

        // Enhanced Blog Post Header
        editor.Components.addType('blog-post-header', {
            model: {
                defaults: {
                    tagName: 'header',
                    attributes: {class: 'blog-post-header'},
                    components: [
                        {
                            tagName: 'h1',
                            type: 'text',
                            content: 'Blog Post Title',
                            attributes: {class: 'fancy-post-title'}
                        },
                        {
                            tagName: 'div',
                            attributes: {class: 'fancy-post-meta'},
                            components: [
                                {
                                    tagName: 'span',
                                    type: 'text',
                                    content: 'Published on: ',
                                    attributes: {class: 'fancy-post-date'}
                                },
                                {
                                    tagName: 'span',
                                    type: 'text',
                                    content: 'July 13, 2024',
                                    attributes: {class: 'fancy-post-date-value'}
                                },
                                {
                                    tagName: 'span',
                                    type: 'text',
                                    content: ' | ',
                                    attributes: {class: 'fancy-meta-separator'}
                                },
                                {
                                    tagName: 'span',
                                    type: 'text',
                                    content: 'Category: ',
                                    attributes: {class: 'fancy-post-category'}
                                },
                                {
                                    tagName: 'span',
                                    type: 'text',
                                    content: 'Technology',
                                    attributes: {class: 'fancy-post-category-value'}
                                }
                            ]
                        }
                    ],
                    styles: `
      .fancy-blog-post-header {
        margin-bottom: 2rem;
        border-bottom: 2px solid #3498db;
        padding-bottom: 1rem;
        background: linear-gradient(to right, #f6f8fa, #e9f0f5);
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .fancy-post-title {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        transition: color 0.3s ease;
      }
      .fancy-post-title:hover {
        color: #3498db;
      }
      .fancy-post-meta {
        font-size: 1rem;
        color: #7f8c8d;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .fancy-post-date, .fancy-post-category {
        font-weight: bold;
        color: #34495e;
      }
      .fancy-post-date-value, .fancy-post-category-value {
        background-color: #3498db;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 20px;
        margin-left: 0.3rem;
      }
      .fancy-meta-separator {
        margin: 0 0.5rem;
      }
    `
                }
            }
        })

        editor.BlockManager.add('blog-post-header', {
            label: 'Blog Post Header',
            category: 'Blog Components',
            content: {type: 'blog-post-header'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18v4H3V5zm0 6h18v2H3v-2zm0 4h14v2H3v-2z"/></svg>'
        })

// Enhanced Blog Post Content
        editor.Components.addType('blog-post-content', {
            model: {
                defaults: {
                    tagName: 'article',
                    attributes: {class: 'blog-post-content'},
                    components: [
                        {
                            tagName: 'p',
                            type: 'text',
                            content: 'This is the first paragraph of your blog post. Replace this with your actual content.',
                            attributes: {class: 'fancy-post-paragraph'}
                        },
                        {
                            tagName: 'h2',
                            type: 'text',
                            content: 'Subheading',
                            attributes: {class: 'fancy-post-subheading'}
                        },
                        {
                            tagName: 'p',
                            type: 'text',
                            content: 'This is another paragraph. You can add more paragraphs, images, and other elements as needed.',
                            attributes: {class: 'fancy-post-paragraph'}
                        },
                        {
                            tagName: 'blockquote',
                            type: 'text',
                            content: 'This is a blockquote. It can be used to highlight important information or quotes.',
                            attributes: {class: 'fancy-post-blockquote'}
                        }
                    ],
                    styles: `
      .fancy-blog-post-content {
        line-height: 1.8;
        color: #333;
        font-size: 1.1rem;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background-color: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }
      .fancy-post-paragraph {
        margin-bottom: 1.5rem;
        transition: transform 0.3s ease;
      }
      .fancy-post-paragraph:hover {
        transform: translateX(5px);
      }
      .fancy-post-subheading {
        font-size: 2rem;
        margin: 2rem 0 1rem;
        color: #2c3e50;
        border-bottom: 2px solid #3498db;
        padding-bottom: 0.5rem;
      }
      .fancy-post-blockquote {
        font-style: italic;
        border-left: 5px solid #3498db;
        padding-left: 1rem;
        margin: 1.5rem 0;
        color: #34495e;
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 5px;
      }
    `
                }
            }
        })

        editor.BlockManager.add('blog-post-content', {
            label: 'Blog Post Content',
            category: 'Blog Components',
            content: {type: 'blog-post-content'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/></svg>'
        })


        editor.Components.addType('author-bio', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'author-bio'},
                    components: [
                        {
                            tagName: 'img',
                            type: 'image',
                            attributes: {
                                class: 'author-image',
                                src: 'https://via.placeholder.com/100x100',
                                alt: 'Author Name'
                            }
                        },
                        {
                            tagName: 'div',
                            attributes: {class: 'author-info'},
                            components: [
                                {
                                    tagName: 'h3',
                                    type: 'text',
                                    content: 'Author Name',
                                    attributes: {class: 'author-name'}
                                },
                                {
                                    tagName: 'p',
                                    type: 'text',
                                    content: 'Short bio of the author. Replace this with actual author information.',
                                    attributes: {class: 'author-description'}
                                }
                            ]
                        }
                    ],
                    styles: `
        .author-bio {
          display: flex;
          align-items: center;
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .author-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 1rem;
        }
        .author-info {
          flex: 1;
        }
        .author-name {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }
        .author-description {
          margin: 0;
          font-size: 0.9rem;
        }
      `
                }
            }
        })

        editor.BlockManager.add('author-bio', {
            label: 'Author Bio',
            category: 'Blog Components',
            content: {type: 'author-bio'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
        })

        editor.Components.addType('related-posts', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'related-posts'},
                    components: [
                        {
                            tagName: 'h3',
                            type: 'text',
                            content: 'Related Posts',
                            attributes: {class: 'related-posts-title'}
                        },
                        {
                            tagName: 'ul',
                            attributes: {class: 'related-posts-list'},
                            components: [
                                {
                                    tagName: 'li',
                                    attributes: {class: 'related-post-item'},
                                    components: [
                                        {
                                            tagName: 'a',
                                            type: 'link',
                                            content: 'Related Post Title 1',
                                            attributes: {href: '#', class: 'related-post-link'}
                                        }
                                    ]
                                },
                                {
                                    tagName: 'li',
                                    attributes: {class: 'related-post-item'},
                                    components: [
                                        {
                                            tagName: 'a',
                                            type: 'link',
                                            content: 'Related Post Title 2',
                                            attributes: {href: '#', class: 'related-post-link'}
                                        }
                                    ]
                                },
                                {
                                    tagName: 'li',
                                    attributes: {class: 'related-post-item'},
                                    components: [
                                        {
                                            tagName: 'a',
                                            type: 'link',
                                            content: 'Related Post Title 3',
                                            attributes: {href: '#', class: 'related-post-link'}
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    styles: `
        .related-posts {
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .related-posts-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .related-posts-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .related-post-item {
          margin-bottom: 0.5rem;
        }
        .related-post-link {
          color: #007bff;
          text-decoration: none;
        }
        .related-post-link:hover {
          text-decoration: underline;
        }
      `
                }
            }
        })

        editor.BlockManager.add('related-posts', {
            label: 'Related Posts',
            category: 'Blog Components',
            content: {type: 'related-posts'},
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>'
        })
// Add an animated hero section component
        editor.BlockManager.add('hero', {
            label: 'Hero',
            content: `
    <section style="background: linear-gradient(45deg, #3498db, #2ecc71); color: white; padding: 100px 50px; text-align: center; position: relative; overflow: hidden;">
      <h2 style="font-size: 3em; margin-bottom: 20px; animation: fadeInDown 1s ease-out;">Welcome to Our Project</h2>
      <p style="font-size: 1.2em; margin-bottom: 30px; animation: fadeInUp 1s ease-out;">Discover the future of innovation with our cutting-edge solutions.</p>
      <button style="background-color: #e74c3c; border: none; color: white; padding: 15px 30px; text-align: center; text-decoration: none; display: inline-block; font-size: 1.2em; margin: 4px 2px; cursor: pointer; border-radius: 50px; transition: all 0.3s ease; animation: pulse 2s infinite;">Get Started</button>
    </section>
    <style>
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-50px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  `,
            category: 'Preset',
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h12v2H6zm0 4h8v2H6z"/></svg>'
        })
        // Add a modern header component with dropdown menu
        editor.BlockManager.add('header', {
            label: 'Header',
            content: `
    <header style="background-color: #2c3e50; padding: 20px; color: white;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1 style="margin: 0;">Project Name</h1>
        <nav>
          <ul style="list-style-type: none; padding: 0; margin: 0; display: flex;">
            <li style="margin-right: 20px; position: relative;">
              <a href="#" style="color: white; text-decoration: none;">Home</a>
            </li>
            <li style="margin-right: 20px; position: relative;">
              <a href="#" style="color: white; text-decoration: none;">About</a>
            </li>
            <li style="margin-right: 20px; position: relative;">
              <a href="#" style="color: white; text-decoration: none;">Services ▼</a>
              <ul style="display: none; position: absolute; background-color: #34495e; padding: 10px; border-radius: 5px;">
                <li><a href="#" style="color: white; text-decoration: none;">Service 1</a></li>
                <li><a href="#" style="color: white; text-decoration: none;">Service 2</a></li>
                <li><a href="#" style="color: white; text-decoration: none;">Service 3</a></li>
              </ul>
            </li>
            <li><a href="#" style="color: white; text-decoration: none;">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
            category: 'Preset',
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v6H3V3zm0 8h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>'
        })

        // Add a modern footer component with social icons
        editor.BlockManager.add('footer', {
            label: 'Footer',
            content: `
    <footer style="background-color: #34495e; color: white; padding: 50px 20px;">
      <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
        <div style="margin-bottom: 30px;">
          <h3>About Us</h3>
          <p>We are dedicated to providing innovative solutions for your business needs.</p>
        </div>
        <div style="margin-bottom: 30px;">
          <h3>Quick Links</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><a href="#" style="color: white; text-decoration: none;">Home</a></li>
            <li><a href="#" style="color: white; text-decoration: none;">Services</a></li>
            <li><a href="#" style="color: white; text-decoration: none;">Contact</a></li>
          </ul>
        </div>
        <div style="margin-bottom: 30px;">
          <h3>Connect With Us</h3>
          <div>
            <a href="#" style="color: white; font-size: 1.5em; margin-right: 10px;"><i class="fab fa-facebook"></i></a>
            <a href="#" style="color: white; font-size: 1.5em; margin-right: 10px;"><i class="fab fa-twitter"></i></a>
            <a href="#" style="color: white; font-size: 1.5em; margin-right: 10px;"><i class="fab fa-linkedin"></i></a>
            <a href="#" style="color: white; font-size: 1.5em;"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p>&copy; 2024 Your Project Name. All rights reserved.</p>
      </div>
    </footer>
  `,
            category: 'Preset',
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 15h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>'
        })

        editor.Components.addType('blog-post-preview', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'blog-post'},
                    components: [
                        {
                            tagName: 'div',
                            attributes: {class: 'blog-image'},
                            components: {
                                type: 'image',
                                attributes: {src: 'https://via.placeholder.com/400x300'}
                            }
                        },
                        {
                            tagName: 'div',
                            attributes: {class: 'blog-content'},
                            components: [
                                {
                                    tagName: 'span',
                                    content: 'CATEGORY',
                                    attributes: {class: 'category'}
                                },
                                {
                                    tagName: 'h2',
                                    content: 'Fascinating Blog Post Title That Catches Your Attention',
                                    attributes: {class: 'title'}
                                },
                                {
                                    tagName: 'p',
                                    content: 'This is a brief excerpt from the blog post...',
                                    attributes: {class: 'excerpt'}
                                },
                                {
                                    tagName: 'div',
                                    attributes: {class: 'meta'},
                                    components: [
                                        {
                                            tagName: 'span',
                                            content: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM6 9a4.5 4.5 0 00-4.5 4.5v.75a4.5 4.5 0 004.5 4.5h10.5a4.5 4.5 0 004.5-4.5v-.75a4.5 4.5 0 00-4.5-4.5H6z"/></svg> Jeremy Zhang',
                                            attributes: {class: 'author'}
                                        },
                                        {
                                            tagName: 'span',
                                            content: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg> May 13, 2024',
                                            attributes: {class: 'date'}
                                        },
                                        {
                                            tagName: 'span',
                                            content: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3l2 2"/></svg> 5 min read',
                                            attributes: {class: 'read-time'}
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    styles: `
                    .blog-post {
                        display: flex;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        overflow: hidden;
                        margin: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 100%;
                        max-width: 800px;
                    }
                    .blog-image {
                        width: 400px;
                        height: 300px;
                        object-fit: cover;
                    }
                    .blog-content {
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                    }
                    .category {
                        color: #6200ea;
                        font-weight: bold;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    }
                    .title {
                        font-size: 1.5em;
                        margin: 0;
                        margin-bottom: 10px;
                    }
                    .excerpt {
                        color: #666;
                        margin: 0;
                        margin-bottom: 20px;
                    }
                    .meta {
                        display: flex;
                        align-items: center;
                        font-size: 0.875em;
                        color: #888;
                        flex-wrap: wrap;
                    }
                    .meta span {
                        margin-right: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .icon {
                        margin-right: 5px;
                        width: 1em;
                        height: 1em;
                    }
                `
                }
            }
        });

        editor.BlockManager.add('blog-post-preview', {
            label: 'Blog Post Preview',
            content: {type: 'blog-post-preview'},
            category: 'Blog Components',
            media: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v2H5zm0-4h14v2H5zm0-4h14v2H5z"/></svg>'
        });

        // Timeline Component
        const timelineHTML = `
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-date">2020</div>
    <div class="timeline-content">
      <h3>Event Title</h3>
      <p>Description of the event goes here.</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-date">2021</div>
    <div class="timeline-content">
      <h3>Another Event</h3>
      <p>Description of another event goes here.</p>
    </div>
  </div>
  <!-- Add more timeline items as needed -->
</div>
`;

        const timelineCSS = `
<style>
  .timeline {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  .timeline::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #4a4a4a;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }
  .timeline-item {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    width: 50%;
  }
  .timeline-item::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: white;
    border: 4px solid #FF9F55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }
  .timeline-item:nth-child(odd) {
    left: 0;
  }
  .timeline-item:nth-child(even) {
    left: 50%;
  }
  .timeline-item:nth-child(even)::after {
    left: -16px;
  }
  .timeline-content {
    padding: 20px 30px;
    background-color: white;
    position: relative;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .timeline-date {
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
`
        editor.BlockManager.add('timeline', {
            label: 'Timeline',
            category: 'Custom Components',
            content: timelineHTML + timelineCSS,
            media: '<svg viewBox="0 0 24 24"><path d="M21 3h-8v6h8V3zm-2 4h-4V5h4v2zM11 9H3v6h8V9zm-2 4H5v-2h4v2zm10 0h-8v6h8v-6zm-2 4h-4v-2h4v2zM2 21h8v-6H2v6zm2-4h4v2H4v-2z"/></svg>'
        });

        editor.Components.addType('image-text-section', {
            isComponent: el => el.tagName === 'DIV' && el.classList.contains('image-text-section'),
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: {class: 'image-text-section'},
                    components: [
                        {
                            tagName: 'div',
                            attributes: {class: 'image-container'},
                            components: [
                                {
                                    type: 'image',
                                    attributes: {class: 'section-image'},
                                    src: 'https://via.placeholder.com/400x300'
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            attributes: {class: 'text-container'},
                            components: [
                                {
                                    tagName: 'h2',
                                    type: 'text',
                                    content: 'Your Heading'
                                },
                                {
                                    tagName: 'p',
                                    type: 'text',
                                    content: 'Your content goes here. Edit this text to add your own content.'
                                },
                                {
                                    tagName: 'button',
                                    content: 'Learn More',
                                    attributes: {class: 'cta-button'}
                                }
                            ]
                        }
                    ],
                    styles: `
      .image-text-section {
        display: flex;
        align-items: center;
        margin: 40px 0;
        background-color: #f8f9fa;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .image-container, .text-container {
        flex: 1;
        padding: 40px;
      }
      .section-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
      }
      .text-container h2 {
        font-size: 28px;
        margin-bottom: 20px;
        color: #333;
      }
      .text-container p {
        font-size: 16px;
        line-height: 1.6;
        color: #666;
        margin-bottom: 20px;
      }
      .cta-button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #0056b3;
      }
      @media (max-width: 768px) {
        .image-text-section {
          flex-direction: column;
        }
      }
    `
                }
            }
        });

// Add the component to the blocks with a custom SVG icon
        editor.BlockManager.add('image-text-section', {
            label: 'Image + Text Section',
            category: 'Sections',
            content: {type: 'image-text-section'},
            media: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
  <circle cx="7" cy="7" r="2" fill="currentColor"/>
  <path d="M16 11H8V13H16V11Z" fill="currentColor"/>
  <path d="M16 15H8V17H16V15Z" fill="currentColor"/>
</svg>`
        });

        //console.log(JSON.stringify(blocks));
       /* editor.on('storage:end:store', async () => {
            editor.runCommand('publish')
        })*/



    })


    return {}
}
