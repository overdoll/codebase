/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurationDateOfBirthNextButtonFragment = {
    readonly dateOfBirth: unknown | null;
    readonly " $refType": "CurationDateOfBirthNextButtonFragment";
};
export type CurationDateOfBirthNextButtonFragment$data = CurationDateOfBirthNextButtonFragment;
export type CurationDateOfBirthNextButtonFragment$key = {
    readonly " $data"?: CurationDateOfBirthNextButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CurationDateOfBirthNextButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationDateOfBirthNextButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateOfBirth",
      "storageKey": null
    }
  ],
  "type": "DateOfBirthCurationProfile",
  "abstractKey": null
};
(node as any).hash = '6c414651fdc1697117a032809b3970c5';
export default node;
