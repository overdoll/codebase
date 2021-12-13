/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostAudienceFragment = {
    readonly audience: {
        readonly title: string;
    } | null;
    readonly " $refType": "PostAudienceFragment";
};
export type PostAudienceFragment$data = PostAudienceFragment;
export type PostAudienceFragment$key = {
    readonly " $data"?: PostAudienceFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostAudienceFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostAudienceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Audience",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '97078cab8850539062b9dbab3b1ae074';
export default node;
