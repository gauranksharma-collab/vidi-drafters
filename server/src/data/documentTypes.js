/**
 * Form-field configuration for each of the 23 legacy affidavit/document types.
 * Extracted from legacy-site-source/draft/*.php (see slug -> source file mapping below).
 *
 * This drives a generic React form-renderer: the renderer walks `groups[].fields[]`
 * and additionally injects (globally, NOT listed per-type below):
 *   - stamp-paper state selector + stamp amount (10/50/101)
 *   - "Other Information" free-text field
 *   - second-signatory fields (sname1/semail1/smobile1 equivalents), shown when the
 *     `second-signatory` add-on is checked
 *
 * Source file mapping:
 *   address-proof                 <- affi_addafi.php
 *   change-of-signature           <- affi_change_of_signature.php
 *   proof-of-income               <- affi_proof_of_income.php
 *   vehicle-sale-purchase         <- affi_vehicle_affidavit.php
 *   pf-indemnity-bond             <- affi_indemnity_bond.php
 *   loss-of-document              <- affi_loss_affidavit.php
 *   change-of-name                <- affi_change_of_name.php
 *   name-after-marriage           <- affi_name_after_marriage.php
 *   name-of-minor                 <- affi_name_of_minor.php
 *   one-and-same-person           <- affi_one_person.php
 *   name-correction               <- affi_name_correction.php
 *   rent-agreement                <- rent.php
 *   add-name-birth-certificate    <- affi_add_name_of_bc.php
 *   first-born-child              <- affi_first_born_child.php
 *   marriage-affidavit-lady       <- affi_marriage_affidavit.php
 *   joint-marriage-affidavit      <- affi_join_marriage.php
 *   individual-marriage-affidavit <- affi_single_marriage.php
 *   proof-of-dob                  <- affi_proof_of_dob.php
 *   education-gap                 <- affi_gap.php
 *   short-attendance              <- affi_short_attendance.php
 *   loss-of-certificate           <- affi_loss_certificate.php
 *   anti-ragging                  <- affi_anti_ragging.php
 *   education-loan                <- affi_loan.php
 */

// Present on most types: e-sign + aadhaar-sign + second-signatory (checkbox values from source: 19 / 39 / 25).
const STANDARD_ADDONS = [
  { key: 'e-sign', label: 'Electronic Signature', price: 19 },
  { key: 'aadhaar-sign', label: 'Aadhaar-based Signature', price: 39 },
  { key: 'second-signatory', label: 'Add Second Signatory', price: 25 },
];

// Present on some types instead of / alongside the standard 3 (checkbox value from source: 170).
const NOTARIAL_ADDON = { key: 'notarial-service', label: 'Notarial Service', price: 170 };

// Common gender / relation option sets reused verbatim across many source forms.
const GENDER_OPTIONS = ['Female', 'Male', 'Rather not say'];
const RELATION_OPTIONS = ['Son of', 'Wife of', 'Daughter of'];
const FAMILY_RELATION_OPTIONS = ['Father', 'Mother', 'Brother', 'Sister', 'Husband', 'Wife', 'Son', 'Daughter'];

const documentTypes = {
  'address-proof': {
    slug: 'address-proof',
    name: 'Address Proof Affidavit',
    category: 'general',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'residingSince', label: 'Residing Since', type: 'text', required: true },
        ],
      },
    ],
    addOns: [NOTARIAL_ADDON, ...STANDARD_ADDONS],
  },

  'change-of-signature': {
    slug: 'change-of-signature',
    name: 'Change of Signature Affidavit',
    category: 'general',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'signatureChangeDate', label: 'Date of Change of Signature', type: 'date', required: true },
        ],
      },
    ],
    addOns: [NOTARIAL_ADDON, ...STANDARD_ADDONS],
  },

  'proof-of-income': {
    slug: 'proof-of-income',
    name: 'Proof of Income Affidavit',
    category: 'general',
    basePrice: 300,
    groups: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: true },
        ],
      },
      {
        title: 'First Family Member',
        fields: [
          { name: 'firstMemberName', label: 'Name', type: 'text', required: true },
          { name: 'firstMemberRelation', label: 'Choose the Relation', type: 'select', options: FAMILY_RELATION_OPTIONS, required: true },
          { name: 'firstMemberAge', label: 'Age', type: 'text', required: true },
          { name: 'firstMemberProfession', label: 'Profession of Member', type: 'text', required: true },
        ],
      },
      {
        title: 'Second Family Member',
        fields: [
          { name: 'secondMemberName', label: 'Name', type: 'text', required: false },
          { name: 'secondMemberRelation', label: 'Choose the Relation', type: 'select', options: FAMILY_RELATION_OPTIONS, required: false },
          { name: 'secondMemberAge', label: 'Age', type: 'text', required: false },
          { name: 'secondMemberProfession', label: 'Profession of Member', type: 'text', required: false },
        ],
      },
      {
        title: 'Third Family Member',
        fields: [
          { name: 'thirdMemberName', label: 'Name', type: 'text', required: false },
          { name: 'thirdMemberRelation', label: 'Choose the Relation', type: 'select', options: FAMILY_RELATION_OPTIONS, required: false },
          { name: 'thirdMemberAge', label: 'Age', type: 'text', required: false },
          { name: 'thirdMemberProfession', label: 'Profession of Member', type: 'text', required: false },
        ],
      },
      {
        title: 'Additional Details',
        fields: [
          { name: 'extendedMemberDetails', label: 'Mention the Details here if there is more than 3 member', type: 'text', required: false },
          { name: 'totalAnnualIncome', label: 'Total Annual Income of Family', type: 'text', required: true },
        ],
      },
    ],
    addOns: [],
  },

  'vehicle-sale-purchase': {
    slug: 'vehicle-sale-purchase',
    name: 'Sale / Purchase of Vehicle Affidavit',
    category: 'general',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'makingParty', label: 'Select who is making Affidavit', type: 'select', options: ['Seller', 'Purchaser'], required: true },
        ],
      },
      {
        title: 'Seller Details',
        fields: [
          { name: 'sellerName', label: 'Name', type: 'text', required: true },
          { name: 'sellerGender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'sellerRelation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'sellerRelativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'sellerAddress', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Purchaser Details',
        fields: [
          { name: 'purchaserName', label: 'Name', type: 'text', required: true },
          { name: 'purchaserGender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'purchaserRelation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'purchaserRelativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'purchaserAddress', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Vehicle Details',
        fields: [
          { name: 'vehicleTypeAndColor', label: 'Type of Vehicle with Color', type: 'text', required: true },
          { name: 'registrationNumber', label: 'Registration Number of Vehicle', type: 'text', required: true },
          { name: 'chassisNumber', label: 'Chassis Number', type: 'text', required: true },
          { name: 'engineNumber', label: 'Engine Number', type: 'text', required: true },
          { name: 'saleDate', label: 'Date of Sale of Vehicle', type: 'date', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'pf-indemnity-bond': {
    slug: 'pf-indemnity-bond',
    name: 'PF Withdrawal cum Indemnity Bond',
    category: 'general',
    basePrice: 300,
    groups: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'temporaryAddress', label: 'Temporary Address (if any)', type: 'textarea', required: true },
          { name: 'permanentAddress', label: 'Permanent Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Employment Details',
        fields: [
          { name: 'companyName', label: 'Name of Company', type: 'text', required: true },
          { name: 'companyAddress', label: 'Address of Company', type: 'textarea', required: true },
          { name: 'joiningDate', label: 'Joining Date of Employment', type: 'date', required: true },
          { name: 'endingDate', label: 'Ending Date of Employment', type: 'date', required: true },
          { name: 'pfAccountNumber', label: 'PF Account Number', type: 'text', required: true },
          { name: 'pfClaimFormName', label: 'Name of PF Claim Form', type: 'text', required: true },
        ],
      },
    ],
    addOns: [],
  },

  'loss-of-document': {
    slug: 'loss-of-document',
    name: 'Loss of Document Affidavit',
    category: 'general',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: false },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'lossDocumentName', label: 'Name of Loss Certificate/Document', type: 'text', required: true },
          { name: 'authorityName', label: 'Name of Authority/School/College', type: 'text', required: true },
          { name: 'receiptRollNumber', label: 'Receipt Number/Roll Number/Enrollment Number', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'change-of-name': {
    slug: 'change-of-name',
    name: 'Change of Name',
    category: 'change-of-name',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'oldName', label: 'Old Name', type: 'text', required: true },
          { name: 'newName', label: 'New Name', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'name-after-marriage': {
    slug: 'name-after-marriage',
    name: 'Change of Name after Marriage',
    category: 'change-of-name',
    basePrice: 300,
    groups: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'oldName', label: 'Old Name', type: 'text', required: true },
          { name: 'newName', label: 'New Name', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'husbandName', label: 'Husband Name', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'name-of-minor': {
    slug: 'name-of-minor',
    name: 'Change of Name of Minor Affidavit',
    category: 'change-of-name',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'maker', label: 'Choose who is making Affidavit', type: 'select', options: ['Father', 'Mother'], required: false },
          { name: 'fatherName', label: "Father's Name of Child", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name of Child", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Minor Child Details',
        fields: [
          { name: 'childGender', label: 'Minor Gender', type: 'select', options: ['Male', 'Female'], required: true },
          { name: 'oldChildName', label: 'Old Name of Child', type: 'text', required: true },
          { name: 'newChildName', label: 'New Name of Child', type: 'text', required: true },
          { name: 'childDob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'birthPlace', label: 'Place of Birth Name', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'one-and-same-person': {
    slug: 'one-and-same-person',
    name: 'One and the Same Person Affidavit',
    category: 'change-of-name',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'realName', label: 'Real Name / Correct Name', type: 'text', required: true },
          { name: 'nameInDocuments', label: 'Name Mentioned in Few Documents as', type: 'text', required: true },
          { name: 'anotherNameInDocuments', label: 'Another Name Mentioned in Few Documents as', type: 'text', required: true },
        ],
      },
    ],
    addOns: [],
  },

  'name-correction': {
    slug: 'name-correction',
    name: 'Name Correction Affidavit',
    category: 'change-of-name',
    basePrice: 300,
    groups: [
      {
        title: 'General Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Name Correction Details',
        fields: [
          { name: 'incorrectName', label: 'Incorrect Name', type: 'text', required: true },
          { name: 'incorrectNameDocument', label: 'Name of Document in which Incorrect Name is mentioned', type: 'text', required: true },
          { name: 'correctNameProofDocument', label: 'Proof of Correct/Actual Name', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'rent-agreement': {
    slug: 'rent-agreement',
    name: 'Rental Agreement Affidavit',
    category: 'rent-agreement',
    basePrice: 300,
    groups: [
      {
        title: 'Owner Details',
        fields: [
          { name: 'ownerName', label: "Owner's Name", type: 'text', required: true },
          { name: 'ownerGender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'ownerRelation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'ownerRelativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'ownerAddress', label: 'Permanent Address of Owner', type: 'textarea', required: true },
          { name: 'ownerAadhaar', label: 'Owner Aadhaar Card Number', type: 'text', required: true },
        ],
      },
      {
        title: 'Tenant Details',
        fields: [
          { name: 'tenantName', label: "Tenant's Name", type: 'text', required: true },
          { name: 'tenantGender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'tenantRelation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'tenantRelativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'tenantAddress', label: 'Permanent Address of Tenant', type: 'textarea', required: true },
          { name: 'tenantAadhaar', label: 'Tenant Aadhaar Card Number', type: 'text', required: true },
        ],
      },
      {
        title: 'Tenancy Terms',
        fields: [
          { name: 'rentedPropertyAddress', label: 'Rented Property Address', type: 'textarea', required: true },
          { name: 'monthlyRent', label: 'Monthly Rent to be Paid (in Rupees)', type: 'number', required: true },
          { name: 'rentPaidOnDay', label: 'Rent to be paid on which day of Calendar', type: 'number', required: true },
          { name: 'maintenanceCharges', label: 'Maintenance Charges (in Rupees)', type: 'number', required: false },
          { name: 'securityAmount', label: 'Security Amount (in Rupees)', type: 'number', required: true },
          { name: 'modeOfPayment', label: 'Mode of Payment', type: 'text', required: true },
          { name: 'agreementDurationMonths', label: 'Duration of Agreement (in Months)', type: 'number', required: true },
          { name: 'commencementDate', label: 'Date of Commence of Agreement', type: 'date', required: true },
          { name: 'endDate', label: 'Date of End of Agreement', type: 'date', required: true },
          { name: 'noticePeriod', label: 'Notice Period (in Months)', type: 'text', required: true },
          { name: 'rentIncrementPercent', label: 'Increment in Rent after expiry of tenure (in percentage)', type: 'text', required: false },
          { name: 'termsModification', label: 'Modification in Terms and Conditions', type: 'text', required: false },
          { name: 'fittingsAndFixtures', label: 'Do you wish to add Fittings & Fixtures?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'agreementType', label: 'Type of Rental Agreement', type: 'select', options: ['Commercial', 'Residential'], required: true },
        ],
      },
    ],
    addOns: [NOTARIAL_ADDON, ...STANDARD_ADDONS],
  },

  'add-name-birth-certificate': {
    slug: 'add-name-birth-certificate',
    name: 'Addition of Name in Birth Certificate Affidavit',
    category: 'birth-marriage',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'fatherName', label: "Father's Name of Child", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name of Child", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Child Details',
        fields: [
          { name: 'childGender', label: 'Child Gender', type: 'select', options: ['Male', 'Female'], required: true },
          { name: 'childName', label: 'Name of Child', type: 'text', required: true },
          { name: 'birthTime', label: 'Time of Birth', type: 'text', required: true },
          { name: 'childDob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'birthPlaceAndHospital', label: 'Place of Birth & Hospital Name', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'first-born-child': {
    slug: 'first-born-child',
    name: 'Affidavit for First Born Child',
    category: 'birth-marriage',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'fatherName', label: "Father's Name of Child", type: 'text', required: true },
          { name: 'motherName', label: "Mother's Name of Child", type: 'text', required: true },
          { name: 'fatherAge', label: 'Age of Father', type: 'text', required: true },
          { name: 'grandfatherName', label: "Grandfather's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Child Details',
        fields: [
          { name: 'childGender', label: 'Child Gender', type: 'select', options: ['Male', 'Female'], required: true },
          { name: 'childName', label: 'Name of Child', type: 'text', required: true },
          { name: 'birthTime', label: 'Time of Birth', type: 'text', required: true },
          { name: 'childDob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'birthPlaceAndHospital', label: 'Place of Birth & Hospital Name', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'marriage-affidavit-lady': {
    slug: 'marriage-affidavit-lady',
    name: 'Marriage Affidavit',
    category: 'birth-marriage',
    basePrice: 300,
    groups: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'husbandName', label: 'Husband Name', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Spouse Details',
        fields: [
          { name: 'spouseName', label: 'Name of Husband', type: 'text', required: true },
          { name: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
          { name: 'spouseFatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'marriageRites', label: 'Marriage Rites', type: 'text', required: true },
          { name: 'spouseAddress', label: 'Address of Spouse', type: 'textarea', required: true },
        ],
      },
    ],
    addOns: [],
  },

  'joint-marriage-affidavit': {
    slug: 'joint-marriage-affidavit',
    name: 'Joint Affidavit for Marriage Registration',
    category: 'birth-marriage',
    basePrice: 300,
    groups: [
      {
        title: 'Husband Details',
        fields: [
          { name: 'name', label: 'Name of Husband', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'age', label: 'Age', type: 'text', required: true },
          { name: 'profession', label: 'Profession', type: 'text', required: true },
          { name: 'religion', label: 'Religion', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'maritalStatusAtMarriage', label: 'Marital Status at the Time of Marriage', type: 'text', required: true },
        ],
      },
      {
        title: 'Wife Details',
        fields: [
          { name: 'name', label: 'Name of Wife', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'age', label: 'Age', type: 'text', required: true },
          { name: 'profession', label: 'Profession', type: 'text', required: true },
          { name: 'religion', label: 'Religion', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'maritalStatusAtMarriage', label: 'Marital Status at the Time of Marriage', type: 'text', required: true },
        ],
      },
    ],
    addOns: [],
  },

  'individual-marriage-affidavit': {
    slug: 'individual-marriage-affidavit',
    name: 'Individual Affidavit for Marriage Registration',
    category: 'birth-marriage',
    basePrice: 300,
    groups: [
      {
        title: 'Husband Details',
        fields: [
          { name: 'name', label: 'Name of Husband', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'age', label: 'Age', type: 'text', required: true },
          { name: 'profession', label: 'Profession', type: 'text', required: true },
          { name: 'religion', label: 'Religion', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'maritalStatusAtMarriage', label: 'Marital Status at the Time of Marriage', type: 'text', required: true },
        ],
      },
      {
        title: 'Wife Details',
        fields: [
          { name: 'name', label: 'Name of Wife', type: 'text', required: true },
          { name: 'fatherName', label: "Father's Name", type: 'text', required: true },
          { name: 'age', label: 'Age', type: 'text', required: true },
          { name: 'profession', label: 'Profession', type: 'text', required: true },
          { name: 'religion', label: 'Religion', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'maritalStatusAtMarriage', label: 'Marital Status at the Time of Marriage', type: 'text', required: true },
        ],
      },
      {
        title: 'Marriage Details',
        fields: [
          { name: 'marriageDate', label: 'Date of Marriage', type: 'date', required: false },
          {
            name: 'affidavitType',
            label: 'Select type of Affidavit needed',
            type: 'select',
            options: ['Single Affidavit from Bride', 'Single Affidavit from Groom', 'Individual Affidavit from both (Bride and Groom)'],
            required: true,
          },
        ],
      },
    ],
    addOns: [NOTARIAL_ADDON],
  },

  'proof-of-dob': {
    slug: 'proof-of-dob',
    name: 'Proof of Date of Birth',
    category: 'birth-marriage',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: false },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'education-gap': {
    slug: 'education-gap',
    name: 'Gap Period Affidavit',
    category: 'student',
    basePrice: 300,
    groups: [
      {
        title: null,
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'passingDate', label: 'Date of Passing', type: 'date', required: true },
          { name: 'educationQualification', label: 'Education Qualification', type: 'text', required: true },
          { name: 'gapDuration', label: 'Duration of Gap Period', type: 'text', required: true },
          { name: 'gapReason', label: 'Reason for the Gap', type: 'text', required: true },
        ],
      },
    ],
    addOns: [],
  },

  'short-attendance': {
    slug: 'short-attendance',
    name: 'Short Attendance Affidavit',
    category: 'student',
    basePrice: 300,
    groups: [
      {
        title: 'Student Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'schoolName', label: 'Name of the University/College/School', type: 'text', required: true },
          { name: 'enrollmentNumber', label: 'Roll Number/Enrollment Number', type: 'text', required: true },
          { name: 'affidavitGivenBy', label: 'Choose who is giving Affidavit', type: 'select', options: ['Parents', 'Student', 'Both'], required: true },
        ],
      },
    ],
    addOns: [],
  },

  'loss-of-certificate': {
    slug: 'loss-of-certificate',
    name: 'Loss of Certificate Affidavit',
    category: 'student',
    basePrice: 300,
    groups: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Course Details',
        fields: [
          { name: 'lossDocumentName', label: 'Name of Loss Certificate/Document', type: 'text', required: true },
          { name: 'schoolName', label: 'Name of the University/College/School', type: 'text', required: true },
          { name: 'enrollmentNumber', label: 'Roll Number/Enrollment Number', type: 'text', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },

  'anti-ragging': {
    slug: 'anti-ragging',
    name: 'Anti Ragging Affidavit/Undertaking',
    category: 'student',
    basePrice: 300,
    groups: [
      {
        title: 'Student Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
          { name: 'schoolName', label: 'Name of the University/College/School', type: 'text', required: true },
          { name: 'enrollmentNumber', label: 'Enrollment Number/Roll Number', type: 'text', required: true },
          { name: 'documentType', label: 'Select the type of Document you want', type: 'select', options: ['Affidavit', 'Undertaking'], required: true },
          { name: 'affidavitGivenBy', label: 'Choose who is giving Affidavit', type: 'select', options: ['Parents', 'Student', 'Both'], required: true },
        ],
      },
    ],
    addOns: [NOTARIAL_ADDON],
  },

  'education-loan': {
    slug: 'education-loan',
    name: 'Education Loan Affidavit',
    category: 'student',
    basePrice: 300,
    groups: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: GENDER_OPTIONS, required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'relation', label: 'Relation', type: 'select', options: RELATION_OPTIONS, required: true },
          { name: 'relativeName', label: "Related Person's Name", type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'textarea', required: true },
        ],
      },
      {
        title: 'Course Details',
        fields: [
          { name: 'courseName', label: 'Name of the Course', type: 'text', required: true },
          { name: 'schoolName', label: 'Name of the University/College/School', type: 'text', required: true },
          { name: 'commencingDate', label: 'Commencing Date', type: 'date', required: true },
        ],
      },
    ],
    addOns: STANDARD_ADDONS,
  },
};

module.exports = documentTypes;
