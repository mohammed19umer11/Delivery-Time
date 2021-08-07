const sideMenu = [
    {
        name: 'Home',
        list: [
            'Navigation Menu',
            'Title 1',
            'Sub Title 1',
            'Services',
            'Sections',
            'Title 2',
            'Title 3'
        ],
        content: {
            navMenu: [
                'home',
                'about',
                'contact',
            ],
            title_1: 'title1',
            subTitle_1: 'subTitle1',
            services: [
                {
                    image: 'service_image1',
                    text: 'service_text1,'
                },
                {
                    image: 'service_image2',
                    text: 'service_text2,'
                },
                {
                    image: 'service_image3',
                    text: 'service_text3,'
                },
            ],
            section: [
                {
                    image: 'section_image1',
                    text: 'section_text1'
                },
                {
                    image: 'section_image2',
                    text: 'section_text2',
                },
            ],
            title_2: 'title2',
            title_3: 'title3',
        }
    },
    {
        name: 'How it works',
        list: [
            'Title 1',
            'Sub Title 1',
            'Sub Title 2',
            'Title 2',
            'Steps'
        ],
        title_1: 'title1 ',
        subTitle_1: 'subTitle1',
        subTitle_2: 'subTitle2',
        title_2: 'title2 ',
        steps: [
            {
                image: 'how_image1',
                text: 'how_text1'
            },
            {
                image: 'how_image2',
                text: 'how_text2'
            },
        ],
    }
]

export default sideMenu;