import io
import logging
from pypdf import PdfReader

logger = logging.getLogger(__name__)

class PDFService:
    @staticmethod
    def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
        """
        Extracts clean text content from PDF file bytes using pypdf.
        """
        try:
            pdf_file = io.BytesIO(pdf_bytes)
            reader = PdfReader(pdf_file)
            extracted_text = []

            for i, page in enumerate(reader.pages):
                page_text = page.extract_text()
                if page_text:
                    extracted_text.append(page_text.strip())

            full_text = "\n\n".join(extracted_text)
            if not full_text.strip():
                raise ValueError("No readable text found in the PDF. The file might be scanned images or empty.")

            return full_text.strip()
        except Exception as e:
            logger.error(f"Error extracting PDF text: {str(e)}")
            raise ValueError(f"Failed to process PDF file: {str(e)}")

pdf_service = PDFService()
