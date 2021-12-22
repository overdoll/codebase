/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LanguageManagerFragment = {
    readonly language: {
        readonly locale: string;
    };
    readonly " $refType": "LanguageManagerFragment";
};
export type LanguageManagerFragment$data = LanguageManagerFragment;
export type LanguageManagerFragment$key = {
    readonly " $data"?: LanguageManagerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"LanguageManagerFragment">;
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
(node as any).hash = 'ec164ed8df7ae18f5a0db7a52d709ade';
export default node;
