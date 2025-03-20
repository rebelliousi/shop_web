import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../api';
import Modal from './PopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion'; // Import framer-motion

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        username: '',
        gmail: '',
        comment: '',
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const verificationInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const contactMutation = useMutation({
        mutationFn: (data: typeof formData) => {
            return api.post('/contacts/', data);
        },
        onSuccess: () => {
            setIsModalOpen(true);
            setErrorMessage(null);
            setFormError(null);
        },
        onError: (error: any) => {
            setErrorMessage(t('contact.wrong_code'));
            console.log(error);
        },
    });

    const verificationMutation = useMutation({
        mutationFn: (data: { gmail: string; verification_code: string }) => {
            return api.post('/contacts/verify-email/', data);
        },
        onSuccess: () => {
            setErrorMessage(null);
            setVerificationCode('');
            setIsModalOpen(false);
            toast.success('Send successfully!', {
                position: 'top-right',
                autoClose: 1500, 
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        onError: (error: any) => {
            setErrorMessage(t('contact.wrong_code'));
            console.log(error);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.gmail || !formData.comment) {
            setFormError(t('contact.fill_fields'));
            return;
        }

        setFormError(null);
        contactMutation.mutate(formData);
    };

    const handleVerificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        verificationMutation.mutate({ gmail: formData.gmail, verification_code: verificationCode });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            username: '',
            gmail: '',
            comment: '',
        });
    };

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
    };

    return (
        <motion.div 
            className="container mx-auto p-5 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            id="contact"
        >
            <ToastContainer />
            <motion.div 
                className="bg-white rounded-lg shadow-md p-8"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <h1 className="text-lg lg:text-3xl font-bold mb-6 text-center">{t("titles.contact_us")}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-md lg:text-xl font-semibold mb-4">{t("contact.c_information")}</h2>
                        <ul className="space-y-2">
                            <li>
                                <span className="font-medium">{t("contact.address")}</span> 123 Main Street, Anytown, CA 12345
                            </li>
                            <li>
                                <span className="font-medium">{t("contact.phone")}</span> (555) 123-4567
                            </li>
                            <li>
                                <span className="font-medium">{t("contact.gmail")}</span> info@ecommerce.com
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-lg lg:text-xl font-semibold mb-4">{t("contact.send_message_title")}</h2>
                        <form onSubmit={handleSubmit}>
                            {formError && (
                                <p className="text-red-500 text-sm mt-2">{formError}</p>
                            )}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                    {t("contact.name")}
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t("contact.p_name")}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gmail" className="block text-gray-700 font-medium mb-2">
                                    {t("contact.gmail")}
                                </label>
                                <input
                                    type="email"
                                    id="gmail"
                                    name="email"
                                    value={formData.gmail}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t("contact.p_gmail")}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                                    {t("contact.message")}
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t("contact.p_message")}
                                />
                            </div>
                            {contactMutation.isError && (
                                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                            )}
                            {contactMutation.isPending ? (
                                <p>{t("contact.sending")}</p>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    {t("contact.send")}
                                </button>
                            )}
                        </form>
                    </motion.div>
                </div>
            </motion.div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                hasError={verificationMutation.isError}
                isPending={verificationMutation.isPending}
                inputRef={verificationInputRef}
            >
                <motion.h2 
                    className="text-xl font-semibold mb-4 text-center"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Email Verification
                </motion.h2>
                <form onSubmit={handleVerificationSubmit}>
                    <div className="mb-4">
                        <label htmlFor="verificationCode" className="block text-gray-700 font-medium mb-2">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="verificationCode"
                            name="verificationCode"
                            ref={verificationInputRef}
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your Verification Code"
                        />
                    </div>
                    {verificationMutation.isError && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}
                    {verificationMutation.isPending ? (
                        <p>{t("contact.verifying_gmail")}</p>
                    ) : (
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            {t("contact.verify_gmail")}
                        </button>
                    )}
                </form>
            </Modal>
        </motion.div>
    );
};

export default Contact;
