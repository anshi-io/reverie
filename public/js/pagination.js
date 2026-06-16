let page = 2;

const loader = document.querySelector("#loader");
const container = document.querySelector("#listing-container");

const observer = new IntersectionObserver(
  async (entries) => {
    if (!entries[0].isIntersecting) return;

    const searchParams = new URLSearchParams(window.location.search);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    try {
      const res = await fetch(
        `/listings/load-more?page=${page}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
      );

      const listings = await res.json();

      if (listings.length === 0) {
        loader.innerText = "No more listings";
        observer.disconnect();
        return;
      }

      listings.forEach((listing) => {
        
        // let image =
        // listing.images && listing.images.length
        // ? listing.images[0].url
        // :'/images/default.jpg' ;

        container.insertAdjacentHTML(
          "beforeend",
          `
          <a href="/listings/${listing._id}" class="listing-link">
            <div class="card col listing-card">
              <img src="${listing.images[0].url}" class="card-img-top" style="height:20rem">
              <div class="card-img-overlay"></div>
              <div class="card-body">
                <p class="card-text">
                  <b>${listing.title}</b><br>
                  ₹${listing.price.toLocaleString("en-IN")}/night
                </p>
              </div>
            </div>
          </a>
          `
        );
      });

      page++;

    } catch (err) {
      console.log(err);
    }
  },
  { threshold: 0.1 }
);

if (loader) {
  observer.observe(loader);
}