import { useEffect, useState } from "react";
import { ITestimonial } from "../../models/interfaces/ITestimonial";
import { fetchTestimonialsAction } from "../../services/dbservices/company/FetchTestimonialsAction";
import LoadingTestimonialComponent from "./LoadingTestimonialComponent";

const TestimonialComponent = () => {
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTestimonials = async () => {
            setLoading(true);
            const fetchedTestimonials = await fetchTestimonialsAction();
            setTestimonials(fetchedTestimonials);
            setLoading(false);
        };
        getTestimonials();
    }, []);

    // Group Testimonials by category
    const categorizedTestimonials: Record<string, ITestimonial[]> = {
        "Real Estate Agent": [],
        others: [],
    };

    testimonials.forEach((testimonial) => {
        if (testimonial.category === "Real Estate Agent") {
            categorizedTestimonials["Real Estate Agent"].push(testimonial);
        } else {
            categorizedTestimonials.others.push(testimonial);
        }
    });

    return (
        loading ? <LoadingTestimonialComponent /> :
            <div
                className="testimonial1-section-area sp1 py-5"
                style={{
                    backgroundImage: "url(/client/img/all-images/bg/bg1.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="testimonial-header mb-4">
                                <h5>Careers / Testimonials</h5>
                                <h2 className="fw-bold">Agent Testimonials and Realtors</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">

                            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                                {/* Carousel Indicators */}
                                <div className="carousel-indicators">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#testimonialCarousel"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-current={index === 0 ? "true" : undefined}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    ))}
                                </div>

                                {/* Carousel Inner (Slides) */}
                                <div className="carousel-inner">
                                    {testimonials.map((testimony, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <div className="row align-items-center">
                                                {/* Testimonial Image */}
                                                <div className="col-lg-5 text-center d-none d-md-block">
                                                    <img
                                                        src={testimony.banner_image_path}
                                                        className="img-fluid rounded shadow"
                                                        alt="testimonial-banner"
                                                        style={{ height: "300px", objectFit: "cover", width: "100%" }}
                                                    />
                                                </div>

                                                {/* Testimonial Text */}
                                                <div className="col-lg-7">
                                                    <div className="testimonial-box p-4 border rounded shadow bg-white">
                                                        <img
                                                            src="/client/img/icons/quoto-icon1.svg"
                                                            alt="quote-icon"
                                                            className="mb-3"
                                                        />
                                                        <p className="lead">{testimony.testimony}</p>
                                                        <div className="d-flex align-items-center mt-3">
                                                            {/* User Image */}
                                                            <img
                                                                src={testimony.user_image_path}
                                                                className="rounded-circle me-3"
                                                                alt="user"
                                                                width="60"
                                                                height="60"
                                                            />

                                                            {/* User Details */}
                                                            <div>
                                                                <h5 className="mb-1">{testimony.full_name}</h5>
                                                                <small className="text-muted">{testimony.category} - {testimony.region_name}</small>
                                                            </div>

                                                            {/* Logo - Pushes to Right */}
                                                            <img
                                                                src="/client/img/logo/main-logo.png"
                                                                alt="logo"
                                                                className="ms-auto d-none d-md-block"
                                                                height="30"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Carousel Controls */}
                                <button className="carousel-control-prev custom-carousel-btn" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                <button className="carousel-control-next custom-carousel-btn" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
    );
};

export default TestimonialComponent;
