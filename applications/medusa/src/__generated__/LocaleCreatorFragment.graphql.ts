/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocaleCreatorFragment = {
    readonly language: {
        readonly locale: string;
    };
    readonly " $refType": "LocaleCreatorFragment";
};
export type LocaleCreatorFragment$data = LocaleCreatorFragment;
export type LocaleCreatorFragment$key = {
    readonly " $data"?: LocaleCreatorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"LocaleCreatorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocaleCreatorFragment",
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
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '351a501bbcf8b30630ac3f926d190cee';
export default node;
