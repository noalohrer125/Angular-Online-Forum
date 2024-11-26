import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class imageService {
    imageToSvg(imageFile: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64Image = event.target?.result;
                if (typeof base64Image === 'string') {
                    const svgString = `
                        <svg xmlns="http://www.w3.org/2000/svg" height="auto" width="auto">
                            <image href="${base64Image}"/>
                        </svg>
                    `;
                    resolve(svgString);
                } else {
                    reject('Error reading file');
                }
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(imageFile);
        });
    }

    svgStringToHtmlElement(svgString: string): SVGElement {
        // Create a new DOMParser instance
        const parser = new DOMParser();
        
        // Parse the SVG string into a Document
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        
        // Get the SVG element from the parsed document
        const svgElement = doc.querySelector('svg');
        
        return svgElement as SVGElement;
    }
}
