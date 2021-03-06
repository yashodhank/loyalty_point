erpnext.invoice_setter = Class.extend({
	init : function(sales_invoice){
		this.invoice = sales_invoice;
		this.set_points()
		this.get_referral()
	},
	set_points: function(){
		var me = this;
		frappe.call({
			method:"loyalty_point_engine.loyalty_point_engine.hooks_call_handler.get_points",
			args:{"customer":me.invoice.frm.doc.customer},
			callback: function(r){
				me.invoice.frm.doc.total_earned_points = r.message.points;
				me.invoice.frm.refresh_fields('total_earned_points');
			}
		})
	},
	get_referral: function(){
		var me = this;
		frappe.call({
			method:"loyalty_point_engine.loyalty_point_engine.hooks_call_handler.get_referral",
			args:{"customer":me.invoice.frm.doc.customer},
			callback: function(r){
				me.invoice.frm.doc.referral = r.message.referral.split('@')[1];
				me.invoice.frm.doc.referral_name = r.message.referral.split('@')[0];
				me.invoice.frm.refresh_fields('referral');
				me.invoice.frm.refresh_fields('referral_name');
			}
		})
	}
})