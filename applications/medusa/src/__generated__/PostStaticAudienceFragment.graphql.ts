/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStaticAudienceFragment = {
    readonly audience: {
        readonly title: string;
    } | null;
    readonly " $refType": "PostStaticAudienceFragment";
};
export type PostStaticAudienceFragment$data = PostStaticAudienceFragment;
export type PostStaticAudienceFragment$key = {
    readonly " $data"?: PostStaticAudienceFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStaticAudienceFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStaticAudienceFragment",
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
(node as any).hash = '75afacb1f738f46db46192098d7d0ecd';
export default node;
