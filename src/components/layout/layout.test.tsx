import { Col, Container, Row } from './layout'
import { render } from '@testing-library/react'

describe('Layout', () => {
    describe('Col', () => {
        it('Should add classes equals to props', () => {
            const { container } = render(<Col xs={12} sm={8} md={6} lg={4} xl={2} first={'xs'} />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('col-xs-12')
            expect(className).toContain('col-sm-8')
            expect(className).toContain('col-md-6')
            expect(className).toContain('col-lg-4')
            expect(className).toContain('col-xl-2')
            expect(className).toContain('first-xs')
        })

        it('Should add "first-*" class if "first" property is set', () => {
            const { container } = render(<Col first='md' />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('first-md')
        })

        it('Should not replace class', () => {
            const { container } = render(<Col className='foo' md={3} />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('foo')
            expect(className).toContain('col-md-3')
        })

        it('Should support auto-width', () => {
            const { container } = render(<Col xs sm md lg xl />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('col-xs')
            expect(className).toContain('col-sm')
            expect(className).toContain('col-md')
            expect(className).toContain('col-lg')
            expect(className).toContain('col-xl')
        })
    })

    describe('Row', () => {
        it('Should add "row" class', () => {
            const { container } = render(<Row />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('row')
        })

        it('Should add "reverse" class if "reverse" property is true', () => {
            const { container } = render(<Row reverse />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('reverse')
        })

        it('Should not replace class', () => {
            const { container } = render(<Row className='foo' />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('foo')
            expect(className).toContain('row')
        })

        it('Should add modificators', () => {
            const { container } = render(
                <Row
                    start='xs'
                    center='sm'
                    end='md'
                    top='lg'
                    middle='xs'
                    bottom='sm'
                    around='md'
                    between='lg'
                />,
            )
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('row')
            expect(className).toContain('start-xs')
            expect(className).toContain('center-sm')
            expect(className).toContain('end-md')
            expect(className).toContain('top-lg')
            expect(className).toContain('middle-xs')
            expect(className).toContain('bottom-sm')
            expect(className).toContain('around-md')
            expect(className).toContain('between-lg')
        })
    })

    describe('Container', () => {
        it('Should add "container" class', () => {
            const { container } = render(<Container />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('container')
        })

        it('Should not replace class', () => {
            const { container } = render(<Container className='foo' />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('foo')
            expect(className).toContain('container')
        })

        it('Should add "container-fluid" class if "fluid" property is true', () => {
            const { container } = render(<Container fluid />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('container-fluid')
        })

        it('Should add "debug" class if "debug" property is true', () => {
            const { container } = render(<Container debug />)
            const className = (container.firstChild as HTMLElement).className
            expect(className).toContain('debug')
            expect(className).toContain('container')
        })
    })
})
