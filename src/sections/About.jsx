import React from 'react';
import { motion } from 'framer-motion';
import finalImg from '../assets/pfinal.png';

const About = () => {
    return (
        <section id="about" className="relative w-full py-20 px-6 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl w-full"
            >
                <div className="relative glass-organic p-8 md:p-16 overflow-hidden">
                    {/* Soft background mesh for card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col md:flex-row justify-between gap-16 items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-paper">
                                About <span className="text-secondary">Me</span>
                            </h2>
                            <p className="text-paper/80 leading-relaxed text-lg text-balance">
                                I am a Computer Science Undergraduate at <span className="text-white font-medium">Sri Krishna College of Engineering and Technology</span> with a CGPA of <span className="text-secondary font-bold">8.8</span>.
                            </p>
                            <p className="text-paper/60 leading-relaxed">
                                My focus lies in bridging the gap between theoretical AI models and robust backend systems. I engineer solutions that solve real-world problems with precision and scale.
                            </p>

                            <div className="flex gap-8 pt-6">
                                <div className="space-y-1">
                                    <span className="text-3xl font-heading font-bold text-white block">8.8</span>
                                    <span className="text-xs text-secondary uppercase tracking-widest font-medium">CGPA</span>
                                </div>
                                <div className="w-[1px] bg-white/10 h-10 self-center"></div>
                                <div className="space-y-1">
                                    <span className="text-3xl font-heading font-bold text-white block">200+</span>
                                    <span className="text-xs text-secondary uppercase tracking-widest font-medium">DSA Problems</span>
                                </div>
                            </div>
                        </div>

                        {/* Abstract Representation of Logic/Brain */}
                        <div className="relative w-80 h-80 hidden md:flex items-center justify-center">
                            <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />

                            {/* Rotating Text Annotation */}
                            <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] pointer-events-none" viewBox="0 0 320 320">
                                <defs>
                                    <path id="circlePath" d="M 160, 160 m -138, 0 a 138,138 0 0,1 276,0 a 138,138 0 0,1 -276,0" />
                                </defs>
                                <text className="fill-white/80 text-[11px] font-bold uppercase tracking-widest" style={{ letterSpacing: "0.2em" }}>
                                    <textPath href="#circlePath" startOffset="0%">
                                        SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp;
                                    </textPath>
                                </text>
                            </svg>

                            <div className="absolute inset-4 border border-white/5 rounded-full" />
                            <div className="w-64 h-64 rounded-full overflow-hidden z-10">
                                <img
                                    src={finalImg}
                                    alt="Profile"
                                    className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
