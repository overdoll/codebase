/**
 * @generated SignedSource<<1d43038a3af90ecdcee64dc4d87d74f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DateOfBirthCurationStepFragment$data = {
  readonly dateOfBirth: {
    readonly dateOfBirth: any | null;
  };
  readonly " $fragmentType": "DateOfBirthCurationStepFragment";
};
export type DateOfBirthCurationStepFragment = DateOfBirthCurationStepFragment$data;
export type DateOfBirthCurationStepFragment$key = {
  readonly " $data"?: DateOfBirthCurationStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DateOfBirthCurationStepFragment">;
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

(node as any).hash = "f2c66e21c9572afd0cba524e0d7b12e3";

export default node;
