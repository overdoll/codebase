/**
 * @generated SignedSource<<6b08b87415b2c76f0dc87b4960e0f90f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LanguageManagerFragment$data = {
  readonly language: {
    readonly locale: string;
  };
  readonly " $fragmentType": "LanguageManagerFragment";
};
export type LanguageManagerFragment = LanguageManagerFragment$data;
export type LanguageManagerFragment$key = {
  readonly " $data"?: LanguageManagerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LanguageManagerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LanguageManagerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Language",
      "kind": "LinkedField",
      "name": "language",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locale",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ec164ed8df7ae18f5a0db7a52d709ade";

export default node;
