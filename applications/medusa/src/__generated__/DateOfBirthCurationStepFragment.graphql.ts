/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DateOfBirthCurationStepFragment = {
    readonly dateOfBirth: {
        readonly dateOfBirth: unknown | null;
    };
    readonly " $refType": "DateOfBirthCurationStepFragment";
};
export type DateOfBirthCurationStepFragment$data = DateOfBirthCurationStepFragment;
export type DateOfBirthCurationStepFragment$key = {
    readonly " $data"?: DateOfBirthCurationStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DateOfBirthCurationStepFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DateOfBirthCurationStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DateOfBirthCurationProfile",
      "kind": "LinkedField",
      "name": "dateOfBirth",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dateOfBirth",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CurationProfile",
  "abstractKey": null
};
(node as any).hash = 'f2c66e21c9572afd0cba524e0d7b12e3';
export default node;
