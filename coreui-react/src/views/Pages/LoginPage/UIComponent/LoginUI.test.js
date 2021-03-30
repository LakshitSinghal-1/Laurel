import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure ({adapter:new Adapter()})

describe('<NavigationItems />',()=>{
    it('Should render 2 <NavigationItems/> elements if not authenticated',()=>{
        const wrapper = shallow(<NavigationItems/>)
        expect(wrapper.find(NavigationItem)).tohaveLength(2);
    });
    it('Should render 2 <NavigationItems/> elements if authenticated',()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated/>)
        expect(wrapper.find(NavigationItem)).tohaveLength(3);
    });
}) 




describe('<NavigationItems />',()=>{
    let wrapper;
    beforeEacg(()=>{
        wrapper = shallow(<NavigationItems/>)
    })
    it('Should render 2 <NavigationItems/> elements if not authenticated',()=>{
    
        expect(wrapper.find(NavigationItem)).tohaveLength(2);
    });
    it('Should render 2 <NavigationItems/> elements if authenticated',()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).tohaveLength(3);
    });
    it('Should render 2 <NavigationItems/> elements if authenticated',()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem LinkTo='/logout'>Logout</NavigationItem>)).isEqual(true);
    });
}) 