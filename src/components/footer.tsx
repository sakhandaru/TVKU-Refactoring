import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-neutral-600 py-16 px-6 text-xs font-medium">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-neutral-200 pb-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="mb-4">
            <Image
              src="/images/tvkublue2x.png"
              width={90}
              height={50}
              alt="TVKU Logo"
              className="object-contain"
            />
          </div>
          <p className="leading-relaxed text-neutral-600 max-w-xs">
            We growing up your business with personal AI manager. <br />
            &copy; 2025 TVKU.
          </p>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900">Contact</h3>
          <p className="text-neutral-600 leading-relaxed">
            Nakula I 5-11, Semarang Tengah, <br />E Building 2nd Floor, UDINUS
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> 024 - 3520334
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp /> +62 812 2811 5941 (Bagus)
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp /> +62 812 2724 1195 (Fitri)
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline hover:text-neutral-900">
                Program
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-neutral-900">
                Live streaming
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-neutral-900">
                Proposal
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-neutral-600 hover:text-neutral-900 text-lg transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-neutral-600 hover:text-neutral-900 text-lg transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Youtube"
              className="text-neutral-600 hover:text-neutral-900 text-lg transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-[11px]">
        <p>Copyright &copy; 2025 TVKU. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:underline hover:text-neutral-900">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline hover:text-neutral-900">
            Terms of Use
          </a>
          <a href="#" className="hover:underline hover:text-neutral-900">
            Sales and Refunds
          </a>
          <a href="#" className="hover:underline hover:text-neutral-900">
            Legal
          </a>
          <a href="#" className="hover:underline hover:text-neutral-900">
            Site Map
          </a>
        </div>
      </div>
    </footer>
  );
}
