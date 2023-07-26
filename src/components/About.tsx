import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="container ">
                <h3 className="display-4 border-dark border-bottom py-2">ABOUT</h3>
                <div className="row my-5 mx-3 shadow" style={{ height: "100vh" }}>
                    <div className="col-md-8 text-light backColorImage" ><img src="images/2ppl.png" className="w-100 h-100  object-fit-cover p-4 rounded" alt="" /></div>
                    <div className="col-md-4 text-light rightColumn">
                        <h3 className=" py-2 my-2 mt-5 display-6">Our Culture</h3>
                        <h5 className=" py-2 mx-4 display-6" style={{ fontSize: "1.5rem" }}>At BCard, we are constantly iterating, solving problems and working together to connect people all over the world. That’s why it’s important that our workforce reflects the diversity of the people we serve. Hiring people with different backgrounds and points of view helps us make better decisions, build better products and create better experiences for everyone.</h5>
                    </div>
                </div>
            </div>

        </>
    )
}

export default About;