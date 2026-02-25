<style>
.etsy-top-bar {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
        padding-bottom: 15px !important;
}

/* WRAPPER WITH ARROWS */
.etsy-tags-wrapper {
    display: flex;
    align-items: self-start;
    gap: 6px;
    max-width: calc(100% - 180px);
}

/* TAGS */
.etsy-tags {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.etsy-tags::-webkit-scrollbar {
  display: none;
}

.etsy-tag {
    padding: 6px 16px;
    border-radius: 999px;
    border: 1px solid #310d32ad;
    text-decoration: none;
    font-size: 12px;
    color: #310d32;
    white-space: nowrap;
    font-weight: 600;
    text-transform: capitalize;
}
.etsy-tag:hover {
  border-color: #000;
}

/* ARROWS */
.etsy-arrow {
  /* width: 36px;
  height: 36px;
  border-radius: 50%; */
  border: 0px solid #d4d4d4;
  background: #fff;
  font-size: 25px;
  cursor: pointer;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.etsy-arrow:hover {
  border-color: #000;
}

/* SORT */
.etsy-sort select {
    padding: 10px 10px;
    border-radius: 999px;
    border: 1px solid #000;
    cursor: pointer;
}

.etsy-tag.active {
  background: #111;
  color: #fff;
  border-color: #111;
  position: relative;
  padding-right: 28px;
}

.etsy-tag .tag-close {
  margin-left: 8px;
  font-weight: bold;
  cursor: pointer;
  display: none;
}

.etsy-tag.active .tag-close {
  display: inline;
}

</style>


<div class="etsy-top-bar page-width">

  <div class="etsy-tags-wrapper">
    <button class="etsy-arrow left" aria-label="Scroll left">‹</button>

    <div class="etsy-tags">
      {% assign used_tags = '' %}
      {% for product in collection.products %}
        {% for tag in product.tags %}
          {% unless used_tags contains tag %}
            {% assign used_tags = used_tags | append: tag | append: ',' %}
            <a href="javascript:void(0)" class="etsy-tag">
  {{ tag }} <span class="tag-close">×</span>
</a>

          {% endunless %}
        {% endfor %}
      {% endfor %}
    </div>

    <button class="etsy-arrow right" aria-label="Scroll right">›</button>
  </div>

  <div class="etsy-sort">
    <form method="get">
      <select name="sort_by" onchange="this.form.submit()">
        <option value="manual" {% if collection.sort_by == 'manual' %}selected{% endif %}>Most relevant</option>
        <option value="best-selling" {% if collection.sort_by == 'best-selling' %}selected{% endif %}>Best selling</option>
        <option value="price-ascending" {% if collection.sort_by == 'price-ascending' %}selected{% endif %}>Price: Low to high</option>
        <option value="price-descending" {% if collection.sort_by == 'price-descending' %}selected{% endif %}>Price: High to low</option>
        <option value="created-descending" {% if collection.sort_by == 'created-descending' %}selected{% endif %}>Newest</option>
      </select>
    </form>
  </div>

</div>


  <script>
  const container = document.querySelector('.etsy-tags');

  container.addEventListener('click', function(e) {
    const tag = e.target.closest('.etsy-tag');
    if (!tag) return;

    // If click on cross OR tag itself
    if (tag.classList.contains('active')) {
      // Remove active
      tag.classList.remove('active');
    } else {
      // Make active
      tag.classList.add('active');
      // Move selected tag to front
      container.prepend(tag);
    }
  });


</script>
