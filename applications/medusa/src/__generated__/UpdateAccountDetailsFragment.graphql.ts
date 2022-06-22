/**
 * @generated SignedSource<<47c7ca2d7f5fe0c3369d659eb08218cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateAccountDetailsFragment$data = {
  readonly details: {
    readonly country: {
      readonly id: string;
    };
    readonly firstName: string;
    readonly id: string;
    readonly lastName: string;
  } | null;
  readonly " $fragmentType": "UpdateAccountDetailsFragment";
};
export type UpdateAccountDetailsFragment$key = {
  readonly " $data"?: UpdateAccountDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateAccountDetailsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateAccountDetailsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountDetails",
      "kind": "LinkedField",
      "name": "details",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Country",
          "kind": "LinkedField",
          "name": "country",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "52bba5b6055e3a4965eb713fbe8a6a7e";

export default node;
