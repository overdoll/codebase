/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DateOfBirthStepFragment = {
    readonly dateOfBirth: {
        readonly skipped: boolean;
        readonly completed: boolean;
        readonly dateOfBirth: unknown | null;
    };
    readonly " $refType": "DateOfBirthStepFragment";
};
export type DateOfBirthStepFragment$data = DateOfBirthStepFragment;
export type DateOfBirthStepFragment$key = {
    readonly " $data"?: DateOfBirthStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DateOfBirthStepFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DateOfBirthStepFragment",
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
          "name": "skipped",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "completed",
          "storageKey": null
        },
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
(node as any).hash = 'fcde887653d794d2a730f30f098fbb5f';
export default node;
