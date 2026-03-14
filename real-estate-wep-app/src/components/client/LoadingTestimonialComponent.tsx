const LoadingTestimonialComponent = () => {

return (

    <div
        className="testimonial1-section-area sp1"
        style={{
            backgroundImage: "url(//client/img/all-images/bg/bg1.png)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}
    >
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="testimonial-header space-margin60 heading1">
                        <h5>Careers/testimonial</h5>
                        <div className="space20"></div>
                        <h2 className="text-anime-style-3">Agent Testimonials</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="testimonialmain-slider">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                            <div className="shimmer-box shimmer-image"></div>
                            </div>
                            <div className="col-lg-7">
                                <div className="testimonial-slider-area slider1">
                                <div className="testimonial-box">
                                            <img
                                                src="//client/img/icons/quoto-icon1.svg"
                                                alt="quote-icon"
                                            />
                                            <div className="space16"></div>
                                            <div className="shimmer-box shimmer-paragraph-text"></div>
                                            <div className="space32"></div>
                                            <div className="test-images">
                                            <div className="d-flex align-items-center gap-3 w-100">
                                                    <div className="shimmer-box shimmer-circle"></div>
                                                    <div className="shimmer-box shimmer-text-lg"></div>
                                                </div>
                                                <img
                                                    src="//client/img/logo/main-logo.png"
                                                    alt="logo"
                                                    className="brand1"
                                                />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

};

export default LoadingTestimonialComponent;
