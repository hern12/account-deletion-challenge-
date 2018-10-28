import React from 'react'
import { shallow, mount, render } from 'enzyme';
import TransferOwnershipModal from '../components/TransferOwnershipModal.react'
import MockDataProvider from '../views/MockDataProvider'
import TerminateModalFlow from '../components/TerminateModalFlow.react'

describe('<MockDataProvider /> Test Suite', () => {
    it('should have only one h1', () => {
        expect(shallow(<TransferOwnershipModal />).contains(<h1>Transfer ownership</h1>)).toBe(true);
    });

    it('should have only one button next', () => {
        expect(render(<MockDataProvider>
            {props => <TerminateModalFlow {...props} />}
        </MockDataProvider>).find('button').length).toBe(1);
    })

    // it('should be selectable by class "foo"', function() {
    //     expect(shallow(<Foo />).is('.foo')).toBe(true);
    // });

    // it('should mount in a full DOM', function() {
    //     expect(mount(<Foo />).find('.foo').length).toBe(1);
    // });

    // it('should render to static HTML', function() {
    //     expect(render(<Foo />).text()).toEqual('Bar');
    // }); 
})