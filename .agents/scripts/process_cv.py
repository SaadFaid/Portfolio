import fitz
from pathlib import Path

pdf_path = Path("attached_assets/Saad_Faid_CV_eng_1786642845741.pdf")
out_dir = Path(".agents/outputs/cv-pages")
out_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"pages={doc.page_count}")
print("metadata=", doc.metadata)

for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    output = out_dir / f"page-{index + 1}.png"
    pix.save(output)
    print(f"rendered={output}")
    print(f"--- page {index + 1} text ---")
    print(page.get_text())