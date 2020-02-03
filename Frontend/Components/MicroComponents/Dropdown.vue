<template>
	<div
		class="dropdown"
		@click="toggleRiskLevels"
		:class="{ expanded: isExpanded }"
		:style="computedStyles"
	>
		<div class="dropdown-label-container">
			<div class="dropdown-label">
        <span class="text">
          {{ (config.prefix ? config.prefix : "") + " "
          }}{{ config.placeholder ? config.placeholder : "" }}
        </span>
				<i class="angle-down" :class="{ toggled: isExpanded }"></i>
			</div>
		</div>

		<div v-expand="isExpanded" class="options expand">
			<div
				v-for="option in configOptions"
				class="option"
                :key="option"
				@click="setCurrentSelectedOption(option);"
			>
				{{ option.value }}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "dropdown",
		data() {
			return {
				isBottomSectionToggled: false,
				optionsHeight: 0,
				optionHeight: 35,
				width: 100,
				configOptions: [],
				backgroundColor: "#cde4f5",
				backgroundExpandedColor: "#fff",
				hoverBackgroundColor: "#0084d4",
				border: "1px solid  #232b35",
				borderRadius: 0,
				textColor: "#fff",
				isExpanded: false
			};
		},
		components: {},
		props: ["config"],
		computed: {
			computedStyles: function() {
				return [
					{ '--options-height': this.optionsHeight + 'px' },
					{ '--options-height-neg': '-' + this.optionsHeight + 'px' },
					{ '--option-height': this.optionHeight + 'px' },
					{ '--main-el-border-radius': this.borderRadius },
					{ '--dropdown-width': this.width + 'px' },
					{ '--dropdown-background-color': this.backgroundColor },
					{ '--dropdown-expanded-color': this.backgroundExpandedColor },
					{ '--dropdown-border': this.border },
					{ '--dropdown-hover-background-color': this.hoverBackgroundColor },
					{ '--dropdown-default-text-color': this.textColor }
				];
			}
		},
		directives: {
			expand: {
				inserted: function(el, binding) {
					if (binding.value !== null) {
						function calcHeight() {
							const currentState = el.getAttribute("aria-expanded");
							el.classList.add("u-no-transition");
							el.removeAttribute("aria-expanded");
							el.style.height = null;
							el.style.height = el.clientHeight + "px";
							el.setAttribute("aria-expanded", currentState);

							setTimeout(function() {
								el.classList.remove("u-no-transition");
							});
						}
						el.classList.add("expand");
						el.setAttribute("aria-expanded", binding.value ? "true" : "false");
						calcHeight();
						window.addEventListener("resize", calcHeight);
					}
				},
				update: function(el, binding) {
					if (el.style.height && binding.value !== null) {
						el.setAttribute("aria-expanded", binding.value ? "true" : "false");
					}
				}
			}
		},
		methods: {
			toggleRiskLevels() {
				this.isExpanded = !this.isExpanded;
			},
			setCurrentSelectedOption(option) {
				this.$emit("setSelectedOption", option);
			},
			setConfigData() {
				this.configOptions = this.config.options;
				this.width = this.config.width;
				this.placeholder = this.config.placeholder;
				if (this.config.backgroundColor) {
					this.backgroundColor = this.config.backgroundColor;
				}
				if (this.config.backgroundExpandedColor) {
					this.backgroundExpandedColor = this.config.backgroundExpandedColor;
				}
				if (this.config.border) {
					this.border = this.config.border;
				}
				if (this.config.hoverBackgroundColor) {
					this.hoverBackgroundColor = this.config.hoverBackgroundColor;
				}
				if (this.config.textColor) {
					this.textColor = this.config.textColor;
				}
				if (this.config.borderRadius) {
					this.borderRadius = this.config.borderRadius;
				}
			},
			setOptionsHeight() {
				this.optionsHeight = this.optionHeight * this.configOptions.length;
			}
		},
		created() {
			this.setConfigData();
			this.setOptionsHeight();
		},
		beforeUdate() {
			// this.setOptionsHeight();
		},
		mounted() {}
	};
</script>

<style scoped>

.dropdown{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: var(--dropdown-width);
  position: relative;
  border: 1px solid transparent;
  border-radius: var(--main-el-border-radius);
  cursor: pointer;
  color: var(--dropdown-default-text-color);
  background: var(--dropdown-background-color);
  user-select: none;
  transition: all 0.7s linear;
}
.dropdown .dropdown-label-container {
  display: flex;
  width: 100%;
}
.dropdown .dropdown-label-container .dropdown-label {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  align-items: center;
  height: var(--option-height);
  padding: 4px 10px;
}
.dropdown .dropdown-label-container .dropdown-label .text {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 24px;
}
.dropdown .dropdown-label-container .dropdown-label .angle-down {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid #fff;
  background: transparent;
  border-width: 0 2px 2px 0;
  padding: 4px;
  width: 1px;
  height: 1px;
  margin: -3px 5px 0 0;
  border-color: var(--dropdown-default-text-color);
  transform: rotate(45deg);
  transition: all 0.7s;
}
.dropdown .dropdown-label-container .dropdown-label .toggled {
  margin-bottom: -12px;
  transform: rotate(-135deg);
  transition: all 0.7s;
}
.dropdown .options {
  width: 100%;
}
.dropdown .options .option {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  height: 35px;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
}
.dropdown .options .option:hover {
  color: black;
  background: #cde4f5;
  transition: all 0.7s;
}
.dropdown .options .option:last-child {
  border-radius: 0 0 var(--main-el-border-radius) var(--main-el-border-radius);
}
.dropdown .options .option:last-child:hover {
  border-radius: 0 0 var(--main-el-border-radius) var(--main-el-border-radius);
}
.dropdown.expanded {
  background: var(--dropdown-expanded-color);
  border: var(--dropdown-border);
  transition: all 0.7s linear;
}
.expand {
  overflow: hidden;
  transition-property: height;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.expand[aria-expanded="false"] {
  height: 0 !important;
  transition-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
}


</style>
