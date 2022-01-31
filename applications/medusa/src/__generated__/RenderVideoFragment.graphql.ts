/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RenderVideoFragment = {
    readonly urls: ReadonlyArray<{
        readonly url: string;
        readonly mimeType: string;
    }>;
    readonly " $refType": "RenderVideoFragment";
};
export type RenderVideoFragment$data = RenderVideoFragment;
export type RenderVideoFragment$key = {
    readonly " $data"?: RenderVideoFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RenderVideoFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RenderVideoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mimeType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = '637ee96142bbb863cfcd4db0464e4ea1';
export default node;
